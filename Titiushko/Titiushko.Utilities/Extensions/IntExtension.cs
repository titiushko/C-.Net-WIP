using System;

namespace Titiushko.Utilities.Extensions
{
    public static class IntExtension
    {
        /// <summary>
        /// Convierte un Int a Enum de tipo T
        /// </summary>
        /// <typeparam name="T">Tipo de Enum de la conversión</typeparam>
        /// <param name="vValue">Int a convertir</param>
        /// <param name="vDefaultValue">Valor predeterminado si "vValue" es null o no se pueda realizar la conversión</param>
        /// <returns>Enum de tipo T</returns>
        public static T ToEnum<T>(this int vValue, T vDefaultValue)
        {
            try
            {
                if (vValue == 0) return vDefaultValue;
                return (T)Enum.ToObject(typeof(T), vValue);
            }
            catch
            {
                return vDefaultValue;
            }
        }
    }
}
