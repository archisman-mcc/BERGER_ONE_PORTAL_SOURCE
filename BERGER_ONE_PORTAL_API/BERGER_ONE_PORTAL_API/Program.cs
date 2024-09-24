
using BERGER_ONE_PORTAL_API.Core;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MSSQL_HELPER.MSSQLHelper;
using BERGER_ONE_PORTAL_API.Dtos;
using BERGER_ONE_PORTAL_API.Filters;
using BERGER_ONE_PORTAL_API.Logic;
using BERGER_ONE_PORTAL_API.Repository.JWT;
using BERGER_ONE_PORTAL_API.Repository.Login;
using BERGER_ONE_PORTAL_API.Validators;
using System.Text;
using BERGER_ONE_PORTAL_API.Repository.Common;
using BERGER_ONE_PORTAL_API.Repository.Utility;
using BERGER_ONE_PORTAL_API.Repository.Logger;
using BERGER_ONE_PORTAL_API.Logic.Protecton;
using BERGER_ONE_PORTAL_API.Repository.Protecton;

namespace BERGER_ONE_PORTAL_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var corsPol = "corspolicy";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(p => p.AddPolicy(corsPol, build =>
            {
                build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
            }));

            builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true).AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Include;
                options.SerializerSettings.DateFormatString = "yyyy-MM-ddTHH:mm:ssZ";
            });

            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddTransient<IValidator<TokenRefreshDto>, TokenRefreshValidator>();
            //builder.Services.AddTransient<IValidator<UserProfileDetailsRequest>, UserProfileDetailsRequestValidator>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddScoped<ISqlHelper, SqlHelper>();
            builder.Services.AddScoped<IServiceContext, ServiceContext>();
            builder.Services.AddScoped<IJwtManager, JwtManager>();

            builder.Services.AddScoped<ILoginRepo, LoginRepo>();
            builder.Services.AddScoped<ILoginLogic, LoginLogic>();
            builder.Services.AddScoped<ICommonLogic, CommonLogic>();
            builder.Services.AddScoped<ICommonRepo, CommonRepo>();

            //builder.Services.AddScoped<ICommonProxy, CommonProxy>();

            builder.Services.AddScoped<ILoggerService, LoggerService>();
            builder.Services.AddScoped<FluentValidationActionFilterAttribute>();
            builder.Services.AddScoped<ErrorHandlerFilterAttribute>();
            builder.Services.AddScoped<APILogAttribute>();
            //builder.Services.AddScoped<HttpHelper>();

            #region Protecton
            builder.Services.AddScoped<IEpcaLogic, EpcaLogic>();
            builder.Services.AddScoped<IEpcaRepo, EpcaRepo>();
            #endregion

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(o =>
            {
                o.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtConfiguration:TokenSecret"])),
                };
            });
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "ONE APP API", Version = "v1", });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"Authorization header using the Bearer scheme..Enter 'Bearer' [space] and then your token in the text input below.Example: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                  {
                    {
                      new OpenApiSecurityScheme
                      {
                        Reference = new OpenApiReference
                          {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                          },
                          Scheme = "oauth2",
                          Name = "Bearer",
                          In = ParameterLocation.Header,
                        },
                        new List<string>()
                      }
                    });
                c.TagActionsBy(api =>
                {
                    if (api.GroupName != null) return new[] { api.GroupName };

                    var controllerActionDescriptor = api.ActionDescriptor as ControllerActionDescriptor;
                    if (controllerActionDescriptor != null) return new[] { controllerActionDescriptor.ControllerName };
                    throw new InvalidOperationException("Unable to determine tag for endpoint.");
                });
                c.DocInclusionPredicate((name, api) => true);
                //c.DocumentFilter<SwaggerDocumentFilter>();
                c.CustomSchemaIds(x => x.FullName);
            });

            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            //if (app.Environment.IsDevelopment())
            //{
                app.UseSwagger();
                app.UseSwaggerUI();
            //}

            app.UseCors(corsPol);

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseCors(corsPolicyBuilder => corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.MapControllers();

            app.Run();
        }
    }
}
