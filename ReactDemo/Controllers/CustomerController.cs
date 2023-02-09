using ReactDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Mvc;

namespace ReactDemo.Controllers
{
    public class CustomerController : Controller
    {
        private MVPEntities4 db = new MVPEntities4();

        public ActionResult Index()
        {
            return View();
        }
        
        public JsonResult CustomerList()
        {
            //var lstCustomer = db.Customers.ToList();
            var lstCustomer = db.Customers.Select(m => new
            {
                m.Id,
                m.Name,
                m.Address,

                lstSale = m.Sales.Select(sm => new
                {
                    sm.Customer_Id,
                    //sm.Date_Sold
                })
            }).ToList();
            return Json(new { CustomerList = lstCustomer }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetById(int id)
        {
            var CustomerInfo = db.Customers.Select(m => new
            {
                m.Id,
                m.Name,
                m.Address,

                lstSale = m.Sales.Select(sm => new
                {
                    sm.Customer_Id,
                    //sm.Date_Sold
                })
            }).Where(x => x.Id == id).SingleOrDefault();

            //var CustomerInfo = db.Customers.Where(x => x.Id == id).SingleOrDefault();
            //var CustomerInfo = db.Customers.Where(x => x.Id == id).SingleOrDefault();
            return Json(CustomerInfo, JsonRequestBehavior.AllowGet);
            
        }
        public JsonResult RemoveCustomer(int id)
        {
            var customer = new Customer { Id = id };
            db.Customers.Attach(customer);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return Json(new { status = "Success", Message = "Record Removed successfully!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddEditCustomer(Customer data)
        {
            try
            {
                if (data.Id == 0)
                {
                    Customer customerObj = new Customer();

                    customerObj.Name = data.Name;
                    //studentObj.Id = data.Class;

                    customerObj.Address = data.Address;
                    db.Customers.Add(customerObj);
                    db.SaveChanges();
                    return Json(new { status = "Success", Message = "Record has been Saved" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var Obj = db.Customers.Where(x => x.Id == data.Id).SingleOrDefault();
                    if (Obj.Id > 0)
                    {
                        Obj.Name = data.Name;

                        Obj.Address = data.Address;
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