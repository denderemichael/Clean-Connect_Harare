
-- Bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cleaner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_type TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  suburb TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Customers can view their own bookings
CREATE POLICY "Customers view own bookings" ON public.bookings FOR SELECT USING (auth.uid() = customer_id);
-- Customers can create bookings
CREATE POLICY "Customers create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Cleaners can view available bookings (pending) or bookings assigned to them
CREATE POLICY "Cleaners view available or assigned bookings" ON public.bookings FOR SELECT 
USING (
  (status = 'pending') OR (auth.uid() = cleaner_id)
);

-- Cleaners can update bookings they are assigned to
CREATE POLICY "Cleaners update assigned bookings" ON public.bookings FOR UPDATE 
USING (auth.uid() = cleaner_id);
