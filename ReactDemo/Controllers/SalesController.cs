using ReactDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace ReactDemo.Controllers
{
    public class SalesController : Controller
    {
        // GET: Sales
        private MVPEntities4 db = new MVPEntities4();
        public ActionResult Index()
        {
            return View();
        }
        //public JsonResult GetSaleslist()
        //{
        //    var saleList = db.Sales.ToList();
        //    {
        //        //S.Customer,
        //        //S.Product,
        //        //S.Store,
        //        //S.Date_Sold,

        //        //Customer = S.Customers.Select(sc => new
        //        //{
        //        //    sc.SubName,
        //        //    sc.SubUrl
        //        //})
        //    }
        //    return Json(saleList, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult GetSalesList()
        {
            var lstSales = db.Sales.Include(u => u.Customer).Include(u => u.Product).Include(u => u.Store).Select
            (m => new
            {
                //ProductID = sale.Product_Id,
                //CustomerID = sale.Customer_Id,
                //StoreID = sale.Store_Id,
                //DateSold = sale.Date_Sold,
                CustomerName = m.Customer.Name,
                ProductName = m.Product.Name,
                StoreName = m.Store.Name,
                m.Id,
                m.Customer_Id, m.Product_Id, m.Store_Id,m.Date_Sold, 
                //m.Customer.Name,


            }).ToList();


            return Json(new { GetSalesList = lstSales }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetById(int id)
        {
            var StoreInfo = db.Sales.Include(u => u.Customer).Include(u => u.Product).Include(u => u.Store).Select
            (m => new
            {
                //ProductID = sale.Product_Id,
                //CustomerID = sale.Customer_Id,
                //StoreID = sale.Store_Id,
                //DateSold = sale.Date_Sold,
                CustomerName = m.Customer.Name,
                ProductName = m.Product.Name,
                StoreName = m.Store.Name,
                m.Id,
                m.Customer_Id,
                m.Product_Id,
                m.Store_Id,
                m.Date_Sold,
                //m.Customer.Name,


            }).Where(x => x.Id == id).SingleOrDefault();
            return Json(StoreInfo, JsonRequestBehavior.AllowGet);
        }

    }
   
}
 