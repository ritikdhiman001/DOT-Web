-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "signature" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
