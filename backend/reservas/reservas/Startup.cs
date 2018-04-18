using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;


using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using reservas.WebCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using Newtonsoft.Json.Serialization;

namespace reservas
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //config db
            var connection = Configuration["ConexaoMySql:MySqlConnectionString"];
            services.AddDbContext<ReservasContext>(options =>
                options.UseMySql(connection)
            );

            // Add framework services. AllowSpecificOrigin
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                       builder =>
                       {
                           builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                       });
            });

            // Add framework services.
            services.AddMvc()
            .AddJsonOptions(json => {
                json.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ReservasContext context, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            InicializaBD.Initialize(context);

            app.UseCors((cfg) => {
                cfg.AllowAnyHeader();
                cfg.AllowAnyOrigin();
                cfg.AllowAnyMethod();
            });
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Serve my app-specific default file, if present.
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles();

   
            //app.UseCors("AllowAllHeaders");
            app.UseMvc();
           
        }
    }
}
