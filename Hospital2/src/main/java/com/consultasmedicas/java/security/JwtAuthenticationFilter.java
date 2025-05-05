package com.consultasmedicas.java.security;

import com.consultasmedicas.java.models.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    // ✅ Usa una clave de mínimo 32 caracteres para HS256
    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor("super-secret-key-para-firmar-jwt-2025!".getBytes());

    private final long EXPIRATION = 1000 * 60 * 60 * 5; // 5 horas

    public String generateToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", usuario.getRol());
        claims.put("id", usuario.getId());
        claims.put("medicoId", usuario.getMedicoId());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public Long extractMedicoId(String token) {
        Object medicoId = extractAllClaims(token).get("medicoId");
        return medicoId != null ? ((Number) medicoId).longValue() : null;
    }

    public String extractRol(String token) {
        return (String) extractAllClaims(token).get("rol");
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
