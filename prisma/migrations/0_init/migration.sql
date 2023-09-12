-- CreateTable
CREATE TABLE "category" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT,
    "cat_id" UUID DEFAULT gen_random_uuid(),

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,
    "quantity" SMALLINT,
    "cat_id" BIGINT,
    "seller_id" BIGINT,
    "price" SMALLINT,
    "size" TEXT,
    "imglink" TEXT,
    "selling_price" SMALLINT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellerdetails" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gstin" TEXT,
    "aadhar" TEXT,
    "ifsc" TEXT,
    "seller_id" TEXT,
    "accno" TEXT,
    "pan" TEXT,
    "sellerid" BIGINT,
    "companypan" TEXT,

    CONSTRAINT "sellerdetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellers" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "name" TEXT,
    "role" BOOLEAN,
    "phone_no" SMALLINT,

    CONSTRAINT "sellers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sellers_email_key" ON "sellers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_phone_no_key" ON "sellers"("phone_no");

-- CreateIndex
CREATE INDEX "email_id_idx" ON "sellers"("email");

-- CreateIndex
CREATE INDEX "person_email" ON "sellers"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

