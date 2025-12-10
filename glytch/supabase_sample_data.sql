-- ============================================================================
-- SUPABASE SAMPLE DATA INSERTS
-- Run these queries in Supabase SQL Editor (copy and paste)
-- ============================================================================

-- ============================================================================
-- 1. INSERT THERAPISTS
-- ============================================================================
INSERT INTO therapists (id, userId, firstName, lastName, email, licenseNumber, specialization, createdAt, updatedAt)
VALUES
  ('therapist_001', 'user_therapist_001', 'Dr', 'Smith', 'doctor.smith@therapy.com', 'LIC-001-2023', 'Sports Medicine', NOW(), NOW());

-- ============================================================================
-- 2. INSERT PATIENTS
-- ============================================================================
INSERT INTO patients (id, userId, firstName, lastName, email, dateOfBirth, injuryType, injuryDate, therapistId, createdAt, updatedAt)
VALUES
  ('patient_001', 'user_patient_001', 'Monish', 'Kumar', 'monish.kumar@email.com', '1990-05-15', 'ACL Tear', '2024-10-01', 'therapist_001', NOW(), NOW()),
  ('patient_002', 'user_patient_002', 'Smitha', 'Rao', 'smitha.rao@email.com', '1995-08-22', 'Rotator Cuff', '2024-09-15', 'therapist_001', NOW(), NOW()),
  ('patient_003', 'user_patient_003', 'Andrew', 'Lee', 'andrew.lee@email.com', '1988-03-10', 'Ankle Sprain', '2024-11-01', 'therapist_001', NOW(), NOW()),
  ('patient_004', 'user_patient_004', 'Prasanth', 'Reddy', 'prasanth.reddy@email.com', '1992-07-18', 'Tennis Elbow', '2024-08-20', 'therapist_001', NOW(), NOW());

-- ============================================================================
-- 3. INSERT EXERCISES
-- ============================================================================
INSERT INTO exercises (id, name, description, instructions, targetBodyParts, difficulty, duration, imageUrl, videoUrl, createdAt)
VALUES
  (
    'ex1',
    'Shoulder Raise',
    'Lateral shoulder strengthening with proper form',
    '["Stand with feet shoulder-width apart", "Hold weights at sides", "Raise arms to shoulder height", "Keep elbows slightly bent", "Lower slowly"]',
    '["shoulders", "deltoids"]',
    'beginner',
    10,
    '/exercises/shoulder-raise.png',
    NULL,
    NOW()
  ),
  (
    'ex2',
    'Left Arm Raise',
    'Single arm raising exercise for left side',
    '["Stand upright with feet hip-width apart", "Keep right arm relaxed at side", "Raise left arm to shoulder height", "Maintain level shoulders", "Lower arm slowly"]',
    '["left shoulder", "left arm"]',
    'beginner',
    8,
    '/exercises/left-arm-raise.png',
    NULL,
    NOW()
  ),
  (
    'ex3',
    'Right Arm Raise',
    'Single arm raising exercise for right side',
    '["Stand upright with feet hip-width apart", "Keep left arm relaxed at side", "Raise right arm to shoulder height", "Maintain level shoulders", "Lower arm slowly"]',
    '["right shoulder", "right arm"]',
    'beginner',
    8,
    '/exercises/right-arm-raise.png',
    NULL,
    NOW()
  ),
  (
    'ex4',
    'Squat',
    'Lower body strengthening and stability',
    '["Stand with feet shoulder-width apart", "Lower your body by bending knees", "Keep chest upright and back straight", "Lower until thighs are parallel to ground", "Push through heels to return to standing"]',
    '["legs", "glutes", "core"]',
    'intermediate',
    12,
    '/exercises/squat.png',
    NULL,
    NOW()
  ),
  (
    'ex5',
    'Arm Stretch',
    'Arm and shoulder flexibility exercise',
    '["Stand upright with feet hip-width apart", "Extend both arms out to sides", "Keep arms perpendicular to body", "Hold stretch for 30 seconds", "Bring arms back slowly"]',
    '["shoulders", "arms", "chest"]',
    'beginner',
    5,
    '/exercises/arm-stretch.png',
    NULL,
    NOW()
  ),
  (
    'ex6',
    'Standing Balance',
    'Balance and core stability training',
    '["Stand upright with good posture", "Feet hip-width apart", "Maintain level shoulders", "Focus on stable knee positioning", "Hold position for 30-60 seconds"]',
    '["core", "legs", "balance"]',
    'intermediate',
    5,
    '/exercises/standing-balance.png',
    NULL,
    NOW()
  ),
  (
    'ex7',
    'Neck Rotation',
    'Neck mobility and flexibility',
    '["Sit upright with shoulders relaxed", "Keep head aligned with spine", "Rotate head gently to the left", "Hold for 2 seconds", "Return to center and repeat on right side"]',
    '["neck", "shoulders"]',
    'beginner',
    5,
    '/exercises/neck-rotation.png',
    NULL,
    NOW()
  );

-- ============================================================================
-- 4. INSERT THERAPIST-PATIENT RELATIONS
-- ============================================================================
INSERT INTO therapistPatientRelations (id, therapistId, patientId, assignedDate, status, notes, createdAt, updatedAt)
VALUES
  ('relation_001', 'therapist_001', 'patient_001', NOW(), 'active', 'Regular weekly sessions', NOW(), NOW()),
  ('relation_002', 'therapist_001', 'patient_002', NOW(), 'active', 'Rotator cuff recovery', NOW(), NOW()),
  ('relation_003', 'therapist_001', 'patient_003', NOW(), 'active', 'Ankle rehabilitation', NOW(), NOW()),
  ('relation_004', 'therapist_001', 'patient_004', NOW(), 'active', 'Elbow injury therapy', NOW(), NOW());

-- ============================================================================
-- 5. INSERT EXERCISE ASSIGNMENTS
-- ============================================================================
INSERT INTO exerciseAssignments (id, therapistId, patientId, exerciseId, assignedDate, dueDate, targetReps, targetSets, targetDuration, notes, status, createdAt, updatedAt)
VALUES
  -- Monish Kumar - ACL Tear
  ('assign_001', 'therapist_001', 'patient_001', 'ex6', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NULL, NULL, 5, 'Balance training for ACL', 'in_progress', NOW(), NOW()),
  ('assign_002', 'therapist_001', 'patient_001', 'ex4', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 10, 3, 12, 'Controlled squats', 'in_progress', NOW(), NOW()),
  ('assign_003', 'therapist_001', 'patient_001', 'ex7', DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 9 DAY), NULL, NULL, 5, 'Mobility work', 'assigned', NOW(), NOW()),
  
  -- Smitha Rao - Rotator Cuff
  ('assign_004', 'therapist_001', 'patient_002', 'ex1', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 15, 3, 10, 'Shoulder strengthening', 'in_progress', NOW(), NOW()),
  ('assign_005', 'therapist_001', 'patient_002', 'ex2', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 12, 3, 8, 'Left arm strengthening', 'in_progress', NOW(), NOW()),
  ('assign_006', 'therapist_001', 'patient_002', 'ex5', DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 8 DAY), NULL, NULL, 5, 'Flexibility', 'assigned', NOW(), NOW()),
  
  -- Andrew Lee - Ankle Sprain
  ('assign_007', 'therapist_001', 'patient_003', 'ex6', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NULL, NULL, 5, 'Balance and stability', 'in_progress', NOW(), NOW()),
  ('assign_008', 'therapist_001', 'patient_003', 'ex7', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NULL, NULL, 5, 'Neck and shoulder mobility', 'in_progress', NOW(), NOW()),
  ('assign_009', 'therapist_001', 'patient_003', 'ex4', DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_ADD(NOW(), INTERVAL 10 DAY), 8, 3, 12, 'Gentle squats', 'assigned', NOW(), NOW()),
  
  -- Prasanth Reddy - Tennis Elbow
  ('assign_010', 'therapist_001', 'patient_004', 'ex3', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 12, 3, 8, 'Right arm strengthening', 'in_progress', NOW(), NOW()),
  ('assign_011', 'therapist_001', 'patient_004', 'ex5', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NULL, NULL, 5, 'Arm and shoulder stretching', 'in_progress', NOW(), NOW()),
  ('assign_012', 'therapist_001', 'patient_004', 'ex1', DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 9 DAY), 15, 3, 10, 'Shoulder raises', 'assigned', NOW(), NOW());

-- ============================================================================
-- 6. INSERT PROGRESS ENTRIES
-- ============================================================================
INSERT INTO progressEntries (id, patientId, exerciseAssignmentId, date, exerciseName, duration, accuracy, score, reps, sets, feedback, videoAnalysisData, createdAt)
VALUES
  -- Monish Kumar's Progress
  (
    'progress_001',
    'patient_001',
    'assign_001',
    DATE_SUB(NOW(), INTERVAL 2 DAY),
    'Standing Balance',
    5,
    82.10,
    0.82,
    NULL,
    NULL,
    '["Good balance control", "Steady progression", "Keep core engaged"]',
    '{"individual_scores": {"balance": 0.82, "posture": 0.83, "stability": 0.81}, "pose_landmarks": [], "exercise_specific_feedback": ["Maintain steady stance", "Great improvement"]}',
    NOW()
  ),
  (
    'progress_002',
    'patient_001',
    'assign_002',
    DATE_SUB(NOW(), INTERVAL 1 DAY),
    'Squat',
    12,
    85.30,
    0.85,
    10,
    3,
    '["Better form noted", "Increased stability", "Good control"]',
    '{"individual_scores": {"knee_stability": 0.85, "range_of_motion": 0.86, "control": 0.84}, "pose_landmarks": [], "exercise_specific_feedback": ["Excellent squat form", "Ready for progression"]}',
    NOW()
  ),
  
  -- Smitha Rao's Progress
  (
    'progress_003',
    'patient_002',
    'assign_004',
    DATE_SUB(NOW(), INTERVAL 3 DAY),
    'Shoulder Raise',
    10,
    80.50,
    0.80,
    14,
    3,
    '["Good shoulder stability", "Nice range of motion"]',
    '{"individual_scores": {"shoulder_stability": 0.80, "arm_extension": 0.82, "control": 0.78}, "pose_landmarks": [], "exercise_specific_feedback": ["Great form", "Monitor for fatigue"]}',
    NOW()
  ),
  (
    'progress_004',
    'patient_002',
    'assign_005',
    DATE_SUB(NOW(), INTERVAL 1 DAY),
    'Left Arm Raise',
    8,
    83.75,
    0.84,
    12,
    3,
    '["Improving consistently", "Pain-free movement"]',
    '{"individual_scores": {"arm_stability": 0.84, "shoulder_control": 0.85, "range_of_motion": 0.83}, "pose_landmarks": [], "exercise_specific_feedback": ["Excellent progress", "Strength improving"]}',
    NOW()
  ),
  
  -- Andrew Lee's Progress
  (
    'progress_005',
    'patient_003',
    'assign_007',
    DATE_SUB(NOW(), INTERVAL 2 DAY),
    'Standing Balance',
    5,
    79.20,
    0.79,
    NULL,
    NULL,
    '["Balance needs work", "Core engagement inconsistent"]',
    '{"individual_scores": {"balance": 0.78, "posture": 0.80, "stability": 0.79}, "pose_landmarks": [], "exercise_specific_feedback": ["Focus on core", "Ankle stability good"]}',
    NOW()
  ),
  (
    'progress_006',
    'patient_003',
    'assign_008',
    DATE_SUB(NOW(), INTERVAL 1 DAY),
    'Neck Rotation',
    5,
    81.40,
    0.81,
    NULL,
    NULL,
    '["Mobility improving", "Good neck control"]',
    '{"individual_scores": {"head_alignment": 0.81, "neck_mobility": 0.82, "stability": 0.80}, "pose_landmarks": [], "exercise_specific_feedback": ["Great mobility work", "Continue progression"]}',
    NOW()
  ),
  
  -- Prasanth Reddy's Progress
  (
    'progress_007',
    'patient_004',
    'assign_010',
    DATE_SUB(NOW(), INTERVAL 2 DAY),
    'Right Arm Raise',
    8,
    86.50,
    0.86,
    11,
    3,
    '["Strong recovery", "Excellent form"]',
    '{"individual_scores": {"arm_stability": 0.87, "shoulder_control": 0.86, "range_of_motion": 0.86}, "pose_landmarks": [], "exercise_specific_feedback": ["Very good", "Elbow looking strong"]}',
    NOW()
  ),
  (
    'progress_008',
    'patient_004',
    'assign_011',
    DATE_SUB(NOW(), INTERVAL 1 DAY),
    'Arm Stretch',
    5,
    88.20,
    0.88,
    NULL,
    NULL,
    '["Excellent flexibility", "Pain-free stretching"]',
    '{"individual_scores": {"flexibility": 0.88, "shoulder_mobility": 0.89, "arm_range": 0.87}, "pose_landmarks": [], "exercise_specific_feedback": ["Outstanding improvement", "Continue regular stretching"]}',
    NOW()
  );

-- ============================================================================
-- 7. INSERT PATIENT DASHBOARD METRICS
-- ============================================================================
INSERT INTO patientDashboardMetrics (id, patientId, date, totalExercisesAssigned, totalExercisesCompleted, averageAccuracy, averageScore, weeklyProgressPercentage, complianceRate, createdAt, updatedAt)
VALUES
  ('metric_p001', 'patient_001', CURDATE(), 3, 2, 83.70, 0.84, 93.00, 90.00, NOW(), NOW()),
  ('metric_p002', 'patient_002', CURDATE(), 3, 2, 82.13, 0.82, 95.00, 92.00, NOW(), NOW()),
  ('metric_p003', 'patient_003', CURDATE(), 3, 2, 80.30, 0.80, 85.00, 85.00, NOW(), NOW()),
  ('metric_p004', 'patient_004', CURDATE(), 3, 2, 87.35, 0.87, 98.00, 98.00, NOW(), NOW());

-- ============================================================================
-- 8. INSERT THERAPIST DASHBOARD METRICS
-- ============================================================================
INSERT INTO therapistDashboardMetrics (id, therapistId, date, totalPatientsAssigned, totalPatientsActive, totalExercisesAssigned, completionRate, averagePatientCompliance, createdAt, updatedAt)
VALUES
  ('metric_t001', 'therapist_001', CURDATE(), 4, 4, 12, 89.00, 91.25, NOW(), NOW());

-- ============================================================================
-- 9. INSERT INJURY REPORTS
-- ============================================================================
INSERT INTO injuryReports (id, patientId, reportDate, injuryType, severity, description, recommendedExercises, uploadedFileUrl, status, createdAt, updatedAt)
VALUES
  (
    'report_001',
    'patient_001',
    NOW(),
    'ACL Tear',
    'moderate',
    'ACL tear from sports injury. Knee instability and swelling. Requires physiotherapy rehabilitation.',
    '["ex4", "ex6", "ex7"]',
    '/reports/patient_001_report.pdf',
    'reviewed',
    NOW(),
    NOW()
  ),
  (
    'report_002',
    'patient_002',
    DATE_SUB(NOW(), INTERVAL 30 DAY),
    'Rotator Cuff',
    'moderate',
    'Rotator cuff strain affecting shoulder mobility. Pain on overhead movements. Limited range of motion.',
    '["ex1", "ex2", "ex5"]',
    '/reports/patient_002_report.pdf',
    'reviewed',
    NOW(),
    NOW()
  ),
  (
    'report_003',
    'patient_003',
    DATE_SUB(NOW(), INTERVAL 20 DAY),
    'Ankle Sprain',
    'mild',
    'Grade II ankle sprain. Mild swelling and pain. Weight-bearing pain present. Sports injury.',
    '["ex6", "ex7", "ex4"]',
    '/reports/patient_003_report.pdf',
    'reviewed',
    NOW(),
    NOW()
  ),
  (
    'report_004',
    'patient_004',
    DATE_SUB(NOW(), INTERVAL 25 DAY),
    'Tennis Elbow',
    'moderate',
    'Lateral epicondylitis (tennis elbow). Pain on gripping. Inflammation of tendons. Work-related repetitive strain.',
    '["ex3", "ex5", "ex1"]',
    '/reports/patient_004_report.pdf',
    'reviewed',
    NOW(),
    NOW()
  );

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- Total Records Inserted:
-- Therapists: 1
-- Patients: 4 (Monish Kumar, Smitha Rao, Andrew Lee, Prasanth Reddy)
-- Exercises: 7 (Shoulder Raise, Left Arm Raise, Right Arm Raise, Squat, Arm Stretch, Standing Balance, Neck Rotation)
-- Therapist-Patient Relations: 4
-- Exercise Assignments: 12
-- Progress Entries: 8
-- Patient Dashboard Metrics: 4
-- Therapist Dashboard Metrics: 1
-- Injury Reports: 4
--
-- All data uses ACTUAL names and exercises from your website!
-- ============================================================================
