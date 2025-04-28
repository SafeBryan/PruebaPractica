package com.consultasmedicas.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.Filter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtTokenUtil jwtUtil;

    public JwtAuthenticationFilter(JwtTokenUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
   protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
   FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        String secretKey = "mitokensecreto123";

        if (header != null && header.startsWith("Bearer ")) {
            // Extraemos el token del encabezado
            String token = header.substring(7);
            System.out.println(token);

            try {
                // Validar y decodificar el JWT
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey) // Asegúrate de usar la misma clave secreta
                        .parseClaimsJws(token)
                        .getBody();

                // Si el token es válido, continuamos con la cadena de filtros
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                // Si la validación falla, enviamos un error 401 Unauthorized con mensaje detallado
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired token. Please provide a valid token.");
                return;
            }
        } else {
            // Si no hay token en el encabezado, se envía un error 401 con mensaje detallado
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Authorization header is missing or incorrect. Please include a valid token.");
            return;
        }
    }

}
