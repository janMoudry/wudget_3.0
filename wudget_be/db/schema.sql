/*
  # Create default client with accounts

  1. New Data
    - Default client "Petr Novák"
    - Three bank accounts:
      - Main account (AirBank)
      - Business account (KB)
      - Savings account (ČSOB)
    - Initial counterparties
    - Sample categories

  2. Security
    - RLS policies remain unchanged
*/

-- Insert default client
INSERT INTO clients (id, name, email, phone, company, status, notes, created_at, updated_at)
VALUES (
  'client-001',
  'Petr Novák',
  'petr.novak@example.com',
  '+420 602 123 456',
  'Novák consulting s.r.o.',
  'ok',
  'Klient má pravidelné výpisy. Poslední audit bez připomínek.',
  '2024-12-01T10:15:00Z',
  '2025-05-20T08:25:00Z'
);

-- Insert accounts
INSERT INTO accounts (id, client_id, name, bank_name, currency, balance, flags, created_at)
VALUES
  (
    'acc-001',
    'client-001',
    'Hlavní účet',
    'AirBank',
    'CZK',
    250000,
    '["main"]',
    '2024-12-01T10:15:00Z'
  ),
  (
    'acc-002',
    'client-001',
    'Firemní účet',
    'KB',
    'CZK',
    1250000,
    '["business"]',
    '2024-12-01T10:15:00Z'
  ),
  (
    'acc-003',
    'client-001',
    'Spořící účet',
    'ČSOB',
    'CZK',
    350000,
    '["savings"]',
    '2024-12-01T10:15:00Z'
  );

-- Insert default categories
INSERT INTO categories (id, name, type)
VALUES
  ('cat-001', 'Příjem - Mzda', 'income'),
  ('cat-002', 'Příjem - Dividendy', 'income'),
  ('cat-003', 'Výdaj - Bydlení', 'expense'),
  ('cat-004', 'Výdaj - Potraviny', 'expense'),
  ('cat-005', 'Výdaj - Doprava', 'expense');

-- Insert default counterparties
INSERT INTO counterparties (id, client_id, name, category, is_regular, exclude_from_stats, created_at)
VALUES
  ('cp-001', 'client-001', 'Novák consulting s.r.o.', 'Příjem - Mzda', 1, 0, '2024-12-01T10:15:00Z'),
  ('cp-002', 'client-001', 'Albert', 'Výdaj - Potraviny', 1, 0, '2024-12-01T10:15:00Z'),
  ('cp-003', 'client-001', 'DPP', 'Výdaj - Doprava', 1, 0, '2024-12-01T10:15:00Z'),
  ('cp-004', 'client-001', 'Nájem', 'Výdaj - Bydlení', 1, 0, '2024-12-01T10:15:00Z');