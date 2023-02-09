using ReactDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactDemo.Controllers
{
    public class HomeController : Controller
    {
        

        //public ActionResult About()
        //{
        //    ViewBag.Message = "Your application description page.";

        //    return View();
        //}

        //public ActionResult Contact()
        //{
        //    ViewBag.Message = "Your contact page.";

        //    return View();
        //}
        // GET: Home
        private MVPEntities4 db = new MVPEntities4();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetMenulist()
        {
            var menuList = db.MainMenus.Select(m => new
            {
                m.Name,
                m.Url,
                
                SubMenu = m.SubMenus.Select(sm => new
                {
                    sm.SubName,
                    sm.SubUrl
                })
            }).ToList();
            return Json(menuList, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult GetMainMenulist()
        //{
        //    var menuList = db.MainMenus.Select(m => new
        //    {
        //        m.Name,
        //        m.Url,

                
        //    }).ToList();
        //    return Json(menuList, JsonRequestBehavior.AllowGet);
        //}
    }
}