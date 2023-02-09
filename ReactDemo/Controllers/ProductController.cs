using ReactDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactDemo.Controllers
{
    public class ProductController : Controller
    {

        private MVPEntities4 db = new MVPEntities4();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ProductList()
        {
            var lstProduct = db.Products.Select(m => new
            {
                m.Id,
                m.Name,
                m.Price,
                lstSale = m.Sales.Select(sm => new
                {
                    sm.Product_Id,
                    //sm.Date_Sold
                })
            }).ToList();
            return Json(new { ProductList = lstProduct }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetById(int id)
        {
            var ProductInfo = db.Products.Select(m => new
            {
                m.Id,
                m.Name,
                m.Price,
                lstSale = m.Sales.Select(sm => new
                {
                    sm.Product_Id,
                })
            }).Where(x => x.Id == id).SingleOrDefault();
            return Json(ProductInfo, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemoveProduct(int id)
        {
            var product = new Product { Id = id };
            db.Products.Attach(product);
            db.Products.Remove(product);
            db.SaveChanges();
            return Json(new { status = "Success", Message = "Record Removed successfully!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddEditProduct(Product data)
        {
            try
            {
                if (data.Id == 0)
                {
                    Product productObj = new Product();

                    productObj.Name = data.Name;
                    //studentObj.Id = data.Class;

                    productObj.Price = data.Price;
                    db.Products.Add(productObj);
                    db.SaveChanges();
                    return Json(new { status = "Success", Message = "Record has been Saved" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var Obj = db.Products.Where(x => x.Id == data.Id).SingleOrDefault();
                    if (Obj.Id > 0)
                    {
                        Obj.Name = data.Name;

                        Obj.Price = data.Price;
                        db.SaveChanges();
                        return Json(new { status = "Success", Message = "Record Updated Successfully!" }, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return Json(new { status = "Error", Message = "Data not Save" });
        }
    }
}