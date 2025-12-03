// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Rol = 'admin' | 'usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Estado de sesión
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  // Rol actual (inicializa desde localStorage si existiera)
  private _role = new BehaviorSubject<Rol | null>(
    (JSON.parse(localStorage.getItem('user') || 'null')?.role as Rol) ?? null
  );
  readonly role$: Observable<Rol | null> = this._role.asObservable();

  /**
   * LOGIN DE PRUEBA (mock) usando "modo"
   *
   * Credenciales:
   *  - Admin   -> usuario: admin   / pass: admin123   (solo modo ADMIN)
   *  - Usuario -> usuario: usuario / pass: user123    (solo modo USUARIO)
   */
  login(usuario: string, password: string, modo: Rol = 'usuario'): Observable<boolean> {
    let ok = false;
    let role: Rol | null = null;
    let nombre = '';

    // Admin válido SOLO si el modo es 'admin'
    if (usuario === 'admin' && password === 'admin123' && modo === 'admin') {
      ok = true;
      role = 'admin';
      nombre = 'Administrador';
    }

    // Usuario válido SOLO si el modo es 'usuario'
    if (usuario === 'usuario' && password === 'user123' && modo === 'usuario') {
      ok = true;
      role = 'usuario';
      nombre = 'Usuario Regular';
    }

    if (ok && role) {
      localStorage.setItem('token', 'mock-token-' + role);
      localStorage.setItem(
        'user',
        JSON.stringify({ id: role === 'admin' ? 1 : 2, username: usuario, nombre, role })
      );
      this._role.next(role);
      this._isLoggedIn.next(true);
      return of(true);
    } else {
      this._isLoggedIn.next(false);
      this._role.next(null);
      return of(false);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._isLoggedIn.next(false);
    this._role.next(null);
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Helper opcional
  getCurrentUser(): { username: string; nombre: string; role: Rol } | null {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
