-- CreateEnum
CREATE TYPE "ProjectInquiryStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'PROPOSAL_SENT', 'ACCEPTED', 'DECLINED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CollaboratorStatus" AS ENUM ('PENDING', 'REVIEWED', 'INTERVIEWED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "project_inquiries" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "companyName" TEXT,
    "projectType" TEXT NOT NULL,
    "budgetRange" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "techPreferences" TEXT,
    "status" "ProjectInquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collaborator_applications" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL,
    "portfolioUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "rate" TEXT,
    "availability" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experienceYears" INTEGER,
    "bio" TEXT NOT NULL,
    "status" "CollaboratorStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collaborator_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collaborator_applications_email_key" ON "collaborator_applications"("email");
