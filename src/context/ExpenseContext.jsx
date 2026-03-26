import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const defaultCategories = [
    { id: '1', name: 'Comida', icon: '🍔', color: '#ef4444' },
    { id: '2', name: 'Transporte', icon: '🚗', color: '#3b82f6' },
    { id: '3', name: 'Ocio', icon: '🎮', color: '#8b5cf6' },
    { id: '4', name: 'Salud', icon: '🏥', color: '#10b981' },
    { id: '5', name: 'Educación', icon: '📚', color: '#f59e0b' },
    { id: '6', name: 'Compras', icon: '🛍️', color: '#ec4899' },
    { id: '7', name: 'Facturas', icon: '📄', color: '#6b7280' },
    { id: '8', name: 'Ingresos', icon: '💰', color: '#22c55e' },
  ];

  // Datos de demo para transacciones
  const demoTransactions = [
    {
      id: '1',
      description: 'Supermercado',
      amount: 150,
      categoryId: '1',
      type: 'expense',
      date: new Date().toISOString(),
      userId: 'demo-user-id'
    },
    {
      id: '2',
      description: 'Gasolina',
      amount: 50,
      categoryId: '2',
      type: 'expense',
      date: new Date(Date.now() - 86400000).toISOString(),
      userId: 'demo-user-id'
    },
    {
      id: '3',
      description: 'Salario',
      amount: 3000,
      categoryId: '8',
      type: 'income',
      date: new Date(Date.now() - 172800000).toISOString(),
      userId: 'demo-user-id'
    }
  ];

  useEffect(() => {
    if (!user) return;

    // Simular carga de datos
    const timer = setTimeout(() => {
      setCategories(defaultCategories);
      setTransactions(demoTransactions);
      setBudgets([]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  const addTransaction = async (transaction) => {
    try {
      // Simulación de agregar transacción
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        userId: user.uid,
        createdAt: new Date().toISOString()
      };
      setTransactions(prev => [newTransaction, ...prev]);
      return newTransaction.id;
    } catch (error) {
      throw new Error('Error al agregar transacción');
    }
  };

  const updateTransaction = async (id, transaction) => {
    try {
      setTransactions(prev => 
        prev.map(t => t.id === id ? { ...t, ...transaction } : t)
      );
    } catch (error) {
      throw new Error('Error al actualizar transacción');
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      throw new Error('Error al eliminar transacción');
    }
  };

  const addCategory = async (category) => {
    try {
      const newCategory = {
        ...category,
        id: Date.now().toString(),
        userId: user.uid
      };
      setCategories(prev => [...prev, newCategory]);
      return newCategory.id;
    } catch (error) {
      throw new Error('Error al agregar categoría');
    }
  };

  const updateBudget = async (budget) => {
    try {
      setBudgets(prev => 
        prev.map(b => b.id === budget.id ? { ...b, ...budget } : b)
      );
    } catch (error) {
      throw new Error('Error al actualizar presupuesto');
    }
  };

  const addBudget = async (budget) => {
    try {
      const newBudget = {
        ...budget,
        id: Date.now().toString(),
        userId: user.uid
      };
      setBudgets(prev => [...prev, newBudget]);
      return newBudget.id;
    } catch (error) {
      throw new Error('Error al agregar presupuesto');
    }
  };

  const getTransactionsByMonth = (month, year) => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === month && transactionDate.getFullYear() === year;
    });
  };

  const getTotalByCategory = (categoryId, month, year) => {
    const monthTransactions = getTransactionsByMonth(month, year);
    return monthTransactions
      .filter(t => t.categoryId === categoryId && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getMonthlyStats = (month, year) => {
    const monthTransactions = getTransactionsByMonth(month, year);
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expenses, balance: income - expenses };
  };

  const value = {
    transactions,
    categories,
    budgets,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateBudget,
    addBudget,
    getTransactionsByMonth,
    getTotalByCategory,
    getMonthlyStats
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
