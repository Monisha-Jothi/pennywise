const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', getTransactions);
router.get('/:id', getTransaction);

router.post(
  '/',
  [
    body('type')
      .isIn(['income', 'expense'])
      .withMessage('Type must be income or expense'),
    body('description')
      .trim()
      .notEmpty()
      .withMessage('Description is required'),
    body('amount')
      .isFloat({ min: 0.01 })
      .withMessage('Amount must be greater than 0'),
    body('category')
      .notEmpty()
      .withMessage('Category is required'),
    body('date')
      .optional()
      .isISO8601()
      .withMessage('Invalid date format')
  ],
  createTransaction
);

router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

module.exports = router;