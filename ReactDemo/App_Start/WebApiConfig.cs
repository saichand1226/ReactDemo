using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ReactDemo
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { controller = "Customers", id = RouteParameter.Optional }
            );
        }
    }
}
