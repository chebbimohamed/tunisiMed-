import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Houni baddelna el Logic bech ma i-loujech 3la Backend
  const login = async (email, password) => {
    // Simulate a delay (k-enou i-kallem fi server)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Logic t-najem t-badelha kima t-7eb bech t-testi el roles
        let role = 'USER';
        if (email.includes('admin')) {
          role = 'ADMIN';
        }

        const fakeUser = {
          id: 1,
          name: "Utilisateur Test",
          email: email,
          role: role // 'ADMIN' walla 'USER'
        };

        localStorage.setItem('token', 'fake-jwt-token-123');
        localStorage.setItem('user', JSON.stringify(fakeUser));
        setUser(fakeUser);
        resolve(fakeUser);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);