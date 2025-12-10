-- ============================================================================
-- Physiotherapy Management System - Database Schema
-- ============================================================================

-- ============================================================================
-- 1. THERAPIST TABLE
-- ============================================================================
CREATE TABLE therapists (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(255) NOT NULL UNIQUE,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  licenseNumber VARCHAR(100) NOT NULL UNIQUE,
  specialization VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_userId (userId),
  INDEX idx_email (email)
);

-- ============================================================================
-- 2. PATIENT TABLE
-- ============================================================================
CREATE TABLE patients (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(255) NOT NULL UNIQUE,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  dateOfBirth DATE,
  injuryType VARCHAR(255),
  injuryDate DATE,
  therapistId VARCHAR(36),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_userId (userId),
  INDEX idx_email (email),
  INDEX idx_therapistId (therapistId),
  FOREIGN KEY (therapistId) REFERENCES therapists(id) ON DELETE SET NULL
);

-- ============================================================================
-- 3. EXERCISE TABLE
-- ============================================================================
CREATE TABLE exercises (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  instructions JSON,
  targetBodyParts JSON,
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
  duration INT DEFAULT 0,
  imageUrl VARCHAR(500),
  videoUrl VARCHAR(500),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_difficulty (difficulty),
  INDEX idx_name (name)
);

-- ============================================================================
-- 4. EXERCISE ASSIGNMENT TABLE
-- ============================================================================
CREATE TABLE exerciseAssignments (
  id VARCHAR(36) PRIMARY KEY,
  therapistId VARCHAR(36) NOT NULL,
  patientId VARCHAR(36) NOT NULL,
  exerciseId VARCHAR(36) NOT NULL,
  assignedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dueDate TIMESTAMP,
  targetReps INT,
  targetSets INT,
  targetDuration INT,
  notes TEXT,
  status ENUM('assigned', 'in_progress', 'completed', 'skipped') DEFAULT 'assigned',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_therapistId (therapistId),
  INDEX idx_patientId (patientId),
  INDEX idx_exerciseId (exerciseId),
  INDEX idx_status (status),
  FOREIGN KEY (therapistId) REFERENCES therapists(id) ON DELETE CASCADE,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (exerciseId) REFERENCES exercises(id) ON DELETE CASCADE
);

-- ============================================================================
-- 5. PROGRESS ENTRY TABLE
-- ============================================================================
CREATE TABLE progressEntries (
  id VARCHAR(36) PRIMARY KEY,
  patientId VARCHAR(36) NOT NULL,
  exerciseAssignmentId VARCHAR(36),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  exerciseName VARCHAR(255) NOT NULL,
  duration INT,
  accuracy DECIMAL(5, 2),
  score DECIMAL(3, 2),
  reps INT,
  sets INT,
  feedback JSON,
  videoAnalysisData JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_patientId (patientId),
  INDEX idx_exerciseAssignmentId (exerciseAssignmentId),
  INDEX idx_date (date),
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (exerciseAssignmentId) REFERENCES exerciseAssignments(id) ON DELETE SET NULL
);

-- ============================================================================
-- 6. THERAPIST-PATIENT RELATION TABLE
-- ============================================================================
CREATE TABLE therapistPatientRelations (
  id VARCHAR(36) PRIMARY KEY,
  therapistId VARCHAR(36) NOT NULL,
  patientId VARCHAR(36) NOT NULL,
  assignedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive', 'transferred') DEFAULT 'active',
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_therapist_patient (therapistId, patientId),
  INDEX idx_therapistId (therapistId),
  INDEX idx_patientId (patientId),
  INDEX idx_status (status),
  FOREIGN KEY (therapistId) REFERENCES therapists(id) ON DELETE CASCADE,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- ============================================================================
-- 7. PATIENT DASHBOARD METRICS TABLE (for analytics)
-- ============================================================================
CREATE TABLE patientDashboardMetrics (
  id VARCHAR(36) PRIMARY KEY,
  patientId VARCHAR(36) NOT NULL,
  date DATE DEFAULT CURDATE(),
  totalExercisesAssigned INT DEFAULT 0,
  totalExercisesCompleted INT DEFAULT 0,
  averageAccuracy DECIMAL(5, 2),
  averageScore DECIMAL(3, 2),
  weeklyProgressPercentage DECIMAL(5, 2),
  complianceRate DECIMAL(5, 2),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_patient_date (patientId, date),
  INDEX idx_patientId (patientId),
  INDEX idx_date (date),
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- ============================================================================
-- 8. THERAPIST DASHBOARD METRICS TABLE (for analytics)
-- ============================================================================
CREATE TABLE therapistDashboardMetrics (
  id VARCHAR(36) PRIMARY KEY,
  therapistId VARCHAR(36) NOT NULL,
  date DATE DEFAULT CURDATE(),
  totalPatientsAssigned INT DEFAULT 0,
  totalPatientsActive INT DEFAULT 0,
  totalExercisesAssigned INT DEFAULT 0,
  completionRate DECIMAL(5, 2),
  averagePatientCompliance DECIMAL(5, 2),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_therapist_date (therapistId, date),
  INDEX idx_therapistId (therapistId),
  INDEX idx_date (date),
  FOREIGN KEY (therapistId) REFERENCES therapists(id) ON DELETE CASCADE
);

-- ============================================================================
-- 9. INJURY REPORT TABLE (for injury analysis)
-- ============================================================================
CREATE TABLE injuryReports (
  id VARCHAR(36) PRIMARY KEY,
  patientId VARCHAR(36) NOT NULL,
  reportDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  injuryType VARCHAR(255),
  severity ENUM('mild', 'moderate', 'severe') DEFAULT 'moderate',
  description TEXT,
  recommendedExercises JSON,
  uploadedFileUrl VARCHAR(500),
  status ENUM('pending', 'reviewed', 'archived') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_patientId (patientId),
  INDEX idx_reportDate (reportDate),
  INDEX idx_status (status),
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- ============================================================================
-- INDEX SUMMARY FOR PERFORMANCE
-- ============================================================================
-- Therapists: userId, email
-- Patients: userId, email, therapistId
-- Exercises: difficulty, name
-- ExerciseAssignments: therapistId, patientId, exerciseId, status
-- ProgressEntries: patientId, exerciseAssignmentId, date
-- TherapistPatientRelations: therapistId, patientId, status
-- PatientDashboardMetrics: patientId, date
-- TherapistDashboardMetrics: therapistId, date
-- InjuryReports: patientId, reportDate, status

-- ============================================================================
-- SAMPLE QUERIES FOR COMMON OPERATIONS
-- ============================================================================

-- Get all patients assigned to a therapist
SELECT p.* FROM patients p
JOIN therapistPatientRelations tpr ON p.id = tpr.patientId
WHERE tpr.therapistId = ? AND tpr.status = 'active';

-- Get all exercises assigned to a patient
SELECT e.*, ea.targetReps, ea.targetSets, ea.targetDuration, ea.status
FROM exercises e
JOIN exerciseAssignments ea ON e.id = ea.exerciseId
WHERE ea.patientId = ? AND ea.status IN ('assigned', 'in_progress');

-- Get patient progress for a specific date range
SELECT pe.* FROM progressEntries pe
WHERE pe.patientId = ? AND DATE(pe.date) BETWEEN ? AND ?
ORDER BY pe.date DESC;

-- Get therapist dashboard data
SELECT 
  COUNT(DISTINCT tpr.patientId) as totalPatientsAssigned,
  COUNT(DISTINCT CASE WHEN tpr.status = 'active' THEN tpr.patientId END) as totalPatientsActive,
  COUNT(DISTINCT ea.id) as totalExercisesAssigned,
  ROUND(COUNT(DISTINCT CASE WHEN ea.status = 'completed' THEN ea.id END) * 100.0 / 
    COUNT(DISTINCT ea.id), 2) as completionRate
FROM therapistPatientRelations tpr
LEFT JOIN exerciseAssignments ea ON tpr.therapistId = ea.therapistId
WHERE tpr.therapistId = ?;

-- Get patient dashboard data
SELECT 
  COUNT(DISTINCT CASE WHEN ea.status IN ('assigned', 'in_progress') THEN ea.id END) as activeExercises,
  COUNT(DISTINCT CASE WHEN ea.status = 'completed' THEN ea.id END) as completedExercises,
  ROUND(AVG(pe.accuracy), 2) as averageAccuracy,
  ROUND(AVG(pe.score), 2) as averageScore
FROM patients p
LEFT JOIN exerciseAssignments ea ON p.id = ea.patientId
LEFT JOIN progressEntries pe ON ea.id = pe.exerciseAssignmentId
WHERE p.id = ?;

-- Get latest injury report for a patient
SELECT * FROM injuryReports
WHERE patientId = ?
ORDER BY reportDate DESC
LIMIT 1;
