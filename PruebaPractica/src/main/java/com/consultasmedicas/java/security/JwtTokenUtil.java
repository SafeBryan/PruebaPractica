package com.consultasmedicas.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtTokenUtil {

    private String secretKey = "mitokensecreto123"; // Asegúrate de usar una clave más segura

    // Generar el token JWT
    public String obtenerToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Expira en 1 día
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // Validar el token JWT
    public boolean validarToken(String token, String username) {
        String usuario = obtenerUsername(token);
        return (usuario.equals(username) && !esTokenExpirado(token));
    }

    // Obtener el usuario desde el token
    public String obtenerUsername(String token) {
        Claims claims = Jwts.parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .getBody();
        return claims.getSubject();
    }

    // Verificar si el token ha expirado
    private boolean esTokenExpirado(String token) {
        Date expirationDate = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }
}
