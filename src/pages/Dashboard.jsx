import React, { useState, useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, formatDate, getMonthlyStats } from '../utils/formatters';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { transactions, categories, getMonthlyStats, getTotalByCategory } = useExpense();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [stats, setStats] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    const month = selectedMonth.getMonth();
    const year = selectedMonth.getFullYear();
    const monthlyStats = getMonthlyStats(month, year);
    setStats(monthlyStats);
  }, [selectedMonth, transactions, getMonthlyStats]);

  const getPieChartData = () => {
    const month = selectedMonth.getMonth();
    const year = selectedMonth.getFullYear();
    
    return categories
      .filter(cat => cat.id !== '8') // Excluir ingresos
      .map(category => ({
        name: category.name,
        value: getTotalByCategory(category.id, month, year),
        color: category.color
      }))
      .filter(item => item.value > 0);
  };

  const getRecentTransactions = () => {
    return transactions.slice(0, 5);
  };

  const getBudgetAlerts = () => {
    // Simulación de alertas de presupuesto
    return [
      { category: 'Comida', spent: 450, budget: 500, percentage: 90 },
      { category: 'Transporte', spent: 180, budget: 200, percentage: 90 },
    ];
  };

  const pieChartData = getPieChartData();
  const recentTransactions = getRecentTransactions();
  const budgetAlerts = getBudgetAlerts();

  const StatCard = ({ title, value, change, icon: Icon, color = 'primary' }) => (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <div className={`flex items-center mt-2 text-sm ${
                change > 0 ? 'text-success-600' : 'text-danger-600'
              }`}>
                {change > 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {Math.abs(change)}% vs mes anterior
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Resumen de tus finanzas</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            value={selectedMonth.toISOString()}
            onChange={(e) => setSelectedMonth(new Date(e.target.value))}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() - i);
              return (
                <option key={i} value={date.toISOString()}>
                  {date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ingresos"
          value={formatCurrency(stats.income)}
          change={12}
          icon={TrendingUp}
          color="success"
        />
        <StatCard
          title="Gastos"
          value={formatCurrency(stats.expenses)}
          change={-8}
          icon={TrendingDown}
          color="danger"
        />
        <StatCard
          title="Balance"
          value={formatCurrency(stats.balance)}
          change={15}
          icon={DollarSign}
          color={stats.balance >= 0 ? 'primary' : 'danger'}
        />
        <StatCard
          title="Ahorro"
          value={stats.income > 0 ? Math.round((stats.balance / stats.income) * 100) + '%' : '0%'}
          change={5}
          icon={ArrowUpRight}
          color="primary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Pastel - Categorías */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gastos por Categoría</h3>
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No hay datos para mostrar
              </div>
            )}
          </div>
        </Card>

        {/* Gráfico de Barras - Comparación */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos vs Gastos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[
                { name: 'Ene', ingresos: 4000, gastos: 2400 },
                { name: 'Feb', ingresos: 3000, gastos: 1398 },
                { name: 'Mar', ingresos: 2000, gastos: 9800 },
                { name: 'Abr', ingresos: 2780, gastos: 3908 },
                { name: 'May', ingresos: 1890, gastos: 4800 },
                { name: 'Jun', ingresos: 2390, gastos: 3800 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="ingresos" fill="#10b981" />
                <Bar dataKey="gastos" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas de Presupuesto */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas de Presupuesto</h3>
            <div className="space-y-3">
              {budgetAlerts.length > 0 ? budgetAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className={`w-5 h-5 ${
                      alert.percentage >= 90 ? 'text-danger-600' : 'text-warning-600'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{alert.category}</p>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(alert.spent)} de {formatCurrency(alert.budget)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      alert.percentage >= 90 ? 'text-danger-600' : 'text-warning-600'
                    }`}>
                      {alert.percentage}%
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4">No hay alertas activas</p>
              )}
            </div>
          </div>
        </Card>

        {/* Transacciones Recientes */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h3>
              <Button variant="outline" size="sm">Ver todas</Button>
            </div>
            <div className="space-y-3">
              {recentTransactions.length > 0 ? recentTransactions.map((transaction) => {
                const category = categories.find(c => c.id === transaction.categoryId);
                return (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-lg">{category?.icon || '📝'}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                );
              }) : (
                <p className="text-gray-500 text-center py-4">No hay transacciones recientes</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
