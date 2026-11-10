import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  CheckCircle2,
  Lock,
  Calendar,
  Clock,
  Sparkles,
  Ticket,
  ShieldCheck,
  ChevronRight,
  Download,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    cartBooking,
    completeBooking,
    user,
    t,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google' | 'points'>('card');
  const [selectedDate, setSelectedDate] = useState('2026-11-14');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [addGripSocks, setAddGripSocks] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{ bookingCode: string; earnedPoints: number } | null>(null);

  if (activeModal !== 'checkout' || !cartBooking) return null;

  const socksPrice = addGripSocks ? 3.5 : 0;
  const totalPrice = Number((cartBooking.price * cartBooking.quantity + socksPrice).toFixed(2));
  const pointsCost = Math.round(totalPrice * 25);
  const canPayWithPoints = user.points >= pointsCost;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = completeBooking(
        paymentMethod === 'card'
          ? 'Credit Card'
          : paymentMethod === 'apple'
          ? 'Apple Pay'
          : paymentMethod === 'google'
          ? 'Google Pay'
          : 'Extreme Points'
      );
      setIsProcessing(false);
      setCompletedOrder(result);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10B981', '#F59E0B', '#EC4899', '#6366F1'],
        });
      } catch {
        // graceful
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={() => {
            setActiveModal(null);
            setCompletedOrder(null);
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* SUCCESS CONFIRMATION RECEIPT */
          <div className="text-center py-4 animate-scale-up">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {t('bookingConfirmed')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Your digital mobile pass has been generated and added to your Dashboard.
            </p>

            {/* Ticket Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left mb-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 mb-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {t('bookingRef')}
                </span>
                <span className="font-mono text-sm font-black text-rose-600 dark:text-rose-400">
                  {completedOrder.bookingCode}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  <strong className="text-slate-900 dark:text-white">{cartBooking.title}</strong>
                </p>
                <p>Scheduled: {selectedDate} at {selectedTime}</p>
                <p>Safety Grip Socks: {addGripSocks ? 'Included (1 Pair)' : 'Brought own'}</p>
                <p className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 mt-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{completedOrder.earnedPoints} Loyalty Points Credited!</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveModal('dashboard');
                setCompletedOrder(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:opacity-95 shadow-md flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>View Digital Pass in Dashboard</span>
            </button>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure Instant Checkout</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
              {t('checkoutTitle')}
            </h2>

            {/* Item Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {cartBooking.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Admission Qty: {cartBooking.quantity}
                  </p>
                </div>
                <span className="text-base font-black text-slate-900 dark:text-white tabular-nums">
                  ${(cartBooking.price * cartBooking.quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Date & Time Selectors */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Select Visit Date</span>
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="2026-11-14">Saturday, Nov 14</option>
                  <option value="2026-11-15">Sunday, Nov 15</option>
                  <option value="2026-11-16">Monday, Nov 16</option>
                  <option value="2026-11-20">Friday, Nov 20</option>
                  <option value="2026-11-21">Saturday, Nov 21</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Entry Time Slot</span>
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="10:00 AM">10:00 AM (Morning Play)</option>
                  <option value="11:30 AM">11:30 AM (Midday Rush)</option>
                  <option value="1:30 PM">1:30 PM (Afternoon Jump)</option>
                  <option value="3:30 PM">3:30 PM (Laser & Play)</option>
                  <option value="5:30 PM">5:30 PM (Evening Glow)</option>
                </select>
              </div>
            </div>

            {/* Grip Socks Addon Toggle */}
            <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-slate-800/80 border border-amber-200/60 dark:border-slate-700 flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Add Extreme Fun Grip Socks (+$3.50)
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  Required for safety trampoline & multi-tier maze entry
                </span>
              </div>
              <input
                type="checkbox"
                checked={addGripSocks}
                onChange={(e) => setAddGripSocks(e.target.checked)}
                className="w-4 h-4 text-rose-500 rounded focus:ring-rose-400"
              />
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
                Payment Method
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card (Visa/MC)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'apple'
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span> Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'google'
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>G Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => canPayWithPoints && setPaymentMethod('points')}
                  disabled={!canPayWithPoints}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    !canPayWithPoints
                      ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400'
                      : paymentMethod === 'points'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{pointsCost} XP Points</span>
                </button>
              </div>
            </div>

            {/* Total Due & Confirm Button */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between mb-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Total Amount Due</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  ${totalPrice}
                </span>
              </div>

              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>{t('payComplete')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>PCI-DSS Level 1 Safe & Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
