using Azure.Core;
using BERGER_ONE_PORTAL_API.Common;
using BERGER_ONE_PORTAL_API.Core;
using BERGER_ONE_PORTAL_API.Dtos.ResponseDto;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MSSQL_HELPER.Model;
using MSSQL_HELPER.MSSQLHelper;
using Newtonsoft.Json;
using BERGER_ONE_PORTAL_API.Models;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BERGER_ONE_PORTAL_API.Repository.JWT
{
    public class JwtManager : IJwtManager
    {
        private readonly ISqlHelper _sqlHelper;
        private readonly IServiceContext _serviceContext;
        private readonly IConfiguration _configuration;
        private string _secret;
        public JwtManager(ISqlHelper sqlHelper, IServiceContext serviceContext, IConfiguration configuration)
        {
            _sqlHelper = sqlHelper;
            _serviceContext = serviceContext;
            _configuration = configuration;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];  // Prepare a buffer to hold the random bytes.
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);  // Fill the buffer with cryptographically strong random bytes.
                return Convert.ToBase64String(randomNumber);  // Convert the bytes to a Base64 string and return.
            }

        }

        public string? GenerateToken(UserDetailsModel user, int expireMinutes = 2)
        {
            _secret = _configuration.GetSection("JwtConfiguration").GetValue(typeof(string), "TokenSecret").ToString();
            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var token = new JwtSecurityToken(null, null,
                new Claim[] { new Claim("userCred", JsonConvert.SerializeObject(user)) },
                expires: DateTime.Now.AddMinutes(expireMinutes),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public ClaimsPrincipal? GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
                if (securityToken == null)
                    return null;

                var symmetricKey = Convert.FromBase64String(_secret);

                var validationParameters = new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(symmetricKey),
                    ValidateLifetime = true,

                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                return principal;
            }

            catch (Exception)
            {
                return null;
            }
        }

        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var securityToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
                if (securityToken == null)
                    return null;

                var symmetricKey = Convert.FromBase64String(_secret);

                var validationParameters = new TokenValidationParameters
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(symmetricKey),
                    ValidateLifetime = false,

                };

                var principal = tokenHandler.ValidateToken(token, validationParameters, out _);

                return principal;
            }

            catch (Exception)
            {
                return null;
            }
        }

    }
}
