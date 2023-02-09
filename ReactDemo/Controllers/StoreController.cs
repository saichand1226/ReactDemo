using ReactDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactDemo.Controllers
{
    public class StoreController : Controller
    {
        private MVPEntities4 db = new MVPEntities4();
        // GET: Store
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult StoreList()
        {
            var lstStore = db.Stores.Select(m => new
            {
                m.Id,
                m.Name,
                m.Address,
                lstSale = m.Sales.Select(sm => new
                {
                    sm.Store_Id,
                    //sm.Date_Sold
                })
            }).ToList();
            return Json(new { StoreList = lstStore }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult GetById(int id)
        {
            var StoreInfo = db.Stores.Select(m => new
            {
                m.Id,
                m.Name,
                m.Address,
                lstSale = m.Sales.Select(sm => new
                {
                    sm.Store_Id,
                    //sm.Date_Sold
                })
            }).Where(x => x.Id == id).SingleOrDefault();
            return Json(StoreInfo, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RemoveStore(int id)
        {
            var store = new Store { Id = id };
            db.Stores.Attach(store);
            db.Stores.Remove(store);
            db.SaveChanges();
            return Json(new { status = "Success", Message = "Record Removed successfully!" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddEditStore(Store data)
        {
            try
            {
                if (data.Id == 0)
                {
                    Store storeObj = new Store();

                    storeObj.Name = data.Name;
                    //studentObj.Id = data.Class;

                    storeObj.Address = data.Address;
                    db.Stores.Add(storeObj);
                    db.SaveChanges();
                    return Json(new { status = "Success", Message = "Record has been Saved" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var Obj = db.Stores.Where(x => x.Id == data.Id).SingleOrDefault();
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