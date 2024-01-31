-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2024 at 03:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rbim_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(5000) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `barangay_code` int(3) NOT NULL,
  `barangay` varchar(50) NOT NULL,
  `municipal_code` int(3) NOT NULL,
  `municipal` varchar(50) NOT NULL,
  `province_code` int(3) NOT NULL,
  `province` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `barangay_code`, `barangay`, `municipal_code`, `municipal`, `province_code`, `province`) VALUES
(1, 1, 'Alipit', 15, 'Magdalena', 34, 'Laguna'),
(2, 2, 'Malaking Ambling', 15, 'Magdalena', 34, 'Laguna'),
(3, 3, 'Munting Ambling', 15, 'Magdalena', 34, 'Laguna'),
(4, 4, 'Baana', 15, 'Magdalena', 34, 'Laguna'),
(5, 5, 'Balanac', 15, 'Magdalena', 34, 'Laguna'),
(6, 6, 'Bucal', 15, 'Magdalena', 34, 'Laguna'),
(7, 7, 'Buenavista', 15, 'Magdalena', 34, 'Laguna'),
(8, 8, 'Bungkol', 15, 'Magdalena', 34, 'Laguna'),
(9, 9, 'Buo', 15, 'Magdalena', 34, 'Laguna'),
(10, 10, 'Burlungan', 15, 'Magdalena', 34, 'Laguna'),
(11, 11, 'Cigaras', 15, 'Magdalena', 34, 'Laguna'),
(12, 12, 'Ibabang Atingay', 15, 'Magdalena', 34, 'Laguna'),
(13, 13, 'Ibabang Butnong', 15, 'Magdalena', 34, 'Laguna'),
(14, 14, 'Ilayang Atingay', 15, 'Magdalena', 34, 'Laguna'),
(15, 15, 'Ilayang Butnong', 15, 'Magdalena', 34, 'Laguna'),
(16, 16, 'Ilog', 15, 'Magdalena', 34, 'Laguna'),
(17, 17, 'Malinao', 15, 'Magdalena', 34, 'Laguna'),
(18, 18, 'Maravilla', 15, 'Magdalena', 34, 'Laguna'),
(19, 19, 'Poblacion', 15, 'Magdalena', 34, 'Laguna'),
(20, 20, 'Sabang', 15, 'Magdalena', 34, 'Laguna'),
(21, 21, 'Salasad', 15, 'Magdalena', 34, 'Laguna'),
(22, 22, 'Tanawan', 15, 'Magdalena', 34, 'Laguna'),
(23, 23, 'Tipunan', 15, 'Magdalena', 34, 'Laguna'),
(24, 24, 'Halayhayin', 15, 'Magdalena', 34, 'Laguna');

-- --------------------------------------------------------

--
-- Table structure for table `household`
--

CREATE TABLE `household` (
  `id` int(11) NOT NULL,
  `survey_form_id` int(11) NOT NULL,
  `household_number` int(10) NOT NULL,
  `living_type` varchar(100) NOT NULL,
  `respondent_name` varchar(50) NOT NULL,
  `household_head` varchar(50) NOT NULL,
  `household_member_no` int(3) NOT NULL,
  `address` int(10) NOT NULL,
  `unit_no` varchar(10) NOT NULL,
  `house_no` int(10) NOT NULL,
  `street` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `household`
--

INSERT INTO `household` (`id`, `survey_form_id`, `household_number`, `living_type`, `respondent_name`, `household_head`, `household_member_no`, `address`, `unit_no`, `house_no`, `street`) VALUES
(24, 25, 43, 'household', 'Ballola, Billy Joel P', 'DelaX, Juan', 3, 6, '43', 42, 'Purok 4'),
(25, 26, 243, 'household', 'Adelan, Reyvine, A. ', 'Adelan, Rey, Alay', 4, 21, 'N/A', 234, 'Purok 3'),
(26, 27, 43, 'household', 'Ballola, Billy Joel, P.', 'Ballola, Joel, A.', 3, 13, 'N/A', 43, 'Purok 4'),
(27, 28, 69, 'household', 'Remolar, Klen Ghel, Corporal', 'Adelan, Reyvine, Alay', 1, 21, '569', 324, 'Purok 3'),
(30, 31, 46, 'household', 'Buag, Juliusmir C.', 'Buag, Judylyn C.', 2, 13, 'N/A', 165, 'Purok 3'),
(31, 32, 89, 'household', 'Tan, Jerone, T', 'Adelan, Reyvine A.', 1, 21, 'hello', 0, 'Purok 5'),
(32, 33, 126, 'household', 'Deyro, Sebastian S.', 'Deyro, Raquel C.', 3, 21, '12', 0, 'Purok 3'),
(33, 34, 212, 'household', 'Novelozo, Kerby D.', 'Novelozo, Maricar C.', 2, 21, '21', 0, 'Purok 5'),
(34, 35, 90, 'household', 'Salgado, Virgie', 'Salgado, Virgie', 1, 13, 'N/A', 146, 'Purok 4'),
(35, 36, 101, 'household', 'Acierto, Joseph, E.', 'Acierto, Joseph E.', 1, 21, '56', 56, 'Purok 6');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `question_code` varchar(5) NOT NULL,
  `question_text` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `question_code`, `question_text`) VALUES
(1, 'Q1', 'Who are the members of this household starting from the HH head?'),
(2, 'Q2', 'What is __\'s relationship to HH head?'),
(3, 'Q3', 'What is __ male or female?'),
(4, 'Q4', 'How old is __ of his/her last birthday?'),
(5, 'Q5', 'When was __ born?'),
(6, 'Q6', 'Where was __ born?'),
(7, 'Q7', 'Is __ a Filipino? if not, what is __\'s nationality?'),
(8, 'Q8', 'What is __\'s current marital status?'),
(9, 'Q9', 'What is the religion of __?'),
(10, 'Q10', 'What is __\'s ethnicity or is __ a Tagalog, Bicolano, Bisaya, etc?'),
(11, 'Q11', 'What is the highest education completed by __?'),
(12, 'Q12', 'Is __ currently enrolled?'),
(13, 'Q13', 'What type of school is __ on?'),
(14, 'Q14', 'In waht barangau and city/municipality is __ currently attending school?'),
(15, 'Q15', 'How much is __\'s monthly income?'),
(16, 'Q16', 'What is the major source of __\'s income?'),
(17, 'Q17', 'What is the status of __\'s word/business'), 
(18, 'Q18', 'in what barangay and city/municipality is __\'s work/business located?'),
(19, 'Q19', 'Where was __ delivered?'),
(20, 'Q20', 'Who attended in the delivery of __?'),
(21, 'Q21', 'What is the last vaccine received by __?'),
(22, 'Q22', 'How many pregnancies does __ had? How many child/ren are still living?'),
(23, 'Q23', 'What family planning method does __ and partner currently use?'),
(24, 'Q24', 'If using FP, where did they obtain the FP method?'),
(25, 'Q25', 'Does __ and partner intend to use FP method? If yes, what method? if no, why not?'),
(26, 'Q26', 'What is the primary health insurance __ have?'),
(27, 'Q27', 'What facility did __ visited in the past 12 months?'),
(28, 'Q28', 'What is the reason for the visit in health facility'),
(29, 'Q29', 'Is there a member of the HH that has any disability? What is the disability?'),
(30, 'Q30', 'Is there a member of the HH that is a solo parent? is he/she registered?'),
(31, 'Q31', 'Is __ a registered senior citizen?'),
(32, 'Q32', 'In what barangay is __ a registered voter?'),
(33, 'Q33', 'In what barangay and city/municipality did __ reside five years ago?'),
(34, 'Q34', 'In what barangay and city/municipality did __ reside six months ago?'),
(35, 'Q35', 'How long is __ been stating in thi barangay?'),
(36, 'Q36', 'Indicate if Non-migrant, Migrant or Transient'),
(37, 'Q37', 'When did __ transfer in this barangay?'),
(38, 'Q38A', 'What are the reason/s why __ left his/her previous residence?'),
(39, 'Q38B', 'What are the reason/s why __ left his/her previous residence?'),
(40, 'Q38C', 'What are the reason/s why __ left his/her previous residence?'),
(41, 'Q39', 'Does __ plan to return to previous residence? When?'),
(42, 'Q40A', 'What are the reason/s why __ tranferred in this barangay?'),
(43, 'Q40B', 'What are the reason/s why __ tranferred in this barangay?'),
(44, 'Q40C', 'What are the reason/s why __ tranferred in this barangay?'),
(45, 'Q41', 'Until when does __ intend to stay in this barangay?'),
(46, 'Q42A', 'Does __ have a valid CTC'),
(47, 'Q42B', 'Was the CTC issued in this barangay?'),
(48, 'Q43', 'What type of skills development training is __ interest to join in?'),
(49, 'Q44', 'What type of skills do you have?'),
(50, 'Q45', 'Do you own or amortize this housing unit occupied by your household or do you rent it, do you occupy it rent-free with consent of owner or rent-free without consent of owner?'),
(51, 'Q46', 'Do you own or amortize this lot occupied by your house hold or do you rent it, do you occupy it rent-free with consent of owner or rent-free without consent of owner?'),
(52, 'Q47', 'What type of fuel does this household use for lighting?'),
(53, 'Q48', 'What kind of fuel does this household use most of the time for cooking?'),
(54, 'Q49', 'What is the household’s main source of drinking water?'),
(55, 'Q50A', 'How does your household usually dispose of your kitchen garbage such as leftover food, peeling of fruits and vegetables, fish and chicken entrails, and others?'),
(56, 'Q50B', 'Do you segregate your garbage?'),
(57, 'Q51', ' What type of toilet facility does this household use?'),
(58, 'Q52', 'Type of building/house'),
(59, 'Q53', 'Construction materials of the outer wall'),
(60, 'Q54', 'Do you have any female HH member who died in the past 12 months? How old is she and what is the cause of her death?'),
(61, 'Q55', 'Do you have a child HH member below 5 years old who died in the past 12 months? How old is she/he? What is the cause of her/his death?'),
(62, 'Q56', 'What are the common diseases that causes death in this barangay?'),
(63, 'Q57', 'What do you think are the primary needs of this barangay?'),
(64, 'Q58', 'Where does your household intend to stay five years from now?');

-- --------------------------------------------------------

--
-- Table structure for table `questions_and_response`
--

CREATE TABLE `questions_and_response` (
  `id` int(11) NOT NULL,
  `household_id` int(11) NOT NULL,
  `member_no` int(5) NOT NULL,
  `Q1` varchar(255) DEFAULT NULL,
  `Q2` varchar(255) DEFAULT NULL,
  `Q3` varchar(255) DEFAULT NULL,
  `Q4` varchar(255) DEFAULT NULL,
  `Q5` varchar(255) DEFAULT NULL,
  `Q6` varchar(255) DEFAULT NULL,
  `Q7` varchar(255) DEFAULT NULL,
  `Q8` varchar(255) DEFAULT NULL,
  `Q9` varchar(255) DEFAULT NULL,
  `Q10` varchar(255) DEFAULT NULL,
  `Q11` varchar(255) DEFAULT NULL,
  `Q12` varchar(255) DEFAULT NULL,
  `Q13` varchar(255) DEFAULT NULL,
  `Q14` varchar(255) DEFAULT NULL,
  `Q15` varchar(255) DEFAULT NULL,
  `Q16` varchar(255) DEFAULT NULL,
  `Q17` varchar(255) DEFAULT NULL,
  `Q18` varchar(255) DEFAULT NULL,
  `Q19` varchar(255) DEFAULT NULL,
  `Q20` varchar(255) DEFAULT NULL,
  `Q21` varchar(255) DEFAULT NULL,
  `Q22` varchar(255) DEFAULT NULL,
  `Q23` varchar(255) DEFAULT NULL,
  `Q24` varchar(255) DEFAULT NULL,
  `Q25` varchar(255) DEFAULT NULL,
  `Q26` varchar(255) DEFAULT NULL,
  `Q27` varchar(255) DEFAULT NULL,
  `Q28` varchar(255) DEFAULT NULL,
  `Q29` varchar(255) DEFAULT NULL,
  `Q30` varchar(255) DEFAULT NULL,
  `Q31` varchar(255) DEFAULT NULL,
  `Q32` varchar(255) DEFAULT NULL,
  `Q33` varchar(255) DEFAULT NULL,
  `Q34` varchar(255) DEFAULT NULL,
  `Q35` varchar(255) DEFAULT NULL,
  `Q36` varchar(255) DEFAULT NULL,
  `Q37` varchar(255) DEFAULT NULL,
  `Q38A` varchar(255) DEFAULT NULL,
  `Q38B` varchar(255) DEFAULT NULL,
  `Q38C` varchar(255) DEFAULT NULL,
  `Q39` varchar(255) DEFAULT NULL,
  `Q40A` varchar(255) DEFAULT NULL,
  `Q40B` varchar(255) DEFAULT NULL,
  `Q40C` varchar(255) DEFAULT NULL,
  `Q41` varchar(255) DEFAULT NULL,
  `Q42A` varchar(255) DEFAULT NULL,
  `Q42B` varchar(255) DEFAULT NULL,
  `Q43` varchar(255) DEFAULT NULL,
  `Q44` varchar(255) DEFAULT NULL,
  `Q45` varchar(255) DEFAULT NULL,
  `Q46` varchar(255) DEFAULT NULL,
  `Q47` varchar(255) DEFAULT NULL,
  `Q48` varchar(255) DEFAULT NULL,
  `Q49` varchar(255) DEFAULT NULL,
  `Q50A` varchar(255) DEFAULT NULL,
  `Q50B` varchar(255) DEFAULT NULL,
  `Q51` varchar(255) DEFAULT NULL,
  `Q52` varchar(255) DEFAULT NULL,
  `Q53` varchar(255) DEFAULT NULL,
  `Q54` varchar(255) DEFAULT NULL,
  `Q55` varchar(255) DEFAULT NULL,
  `Q56` varchar(255) DEFAULT NULL,
  `Q57` varchar(255) DEFAULT NULL,
  `Q58` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions_and_response`
--

INSERT INTO `questions_and_response` (`id`, `household_id`, `member_no`, `Q1`, `Q2`, `Q3`, `Q4`, `Q5`, `Q6`, `Q7`, `Q8`, `Q9`, `Q10`, `Q11`, `Q12`, `Q13`, `Q14`, `Q15`, `Q16`, `Q17`, `Q18`, `Q19`, `Q20`, `Q21`, `Q22`, `Q23`, `Q24`, `Q25`, `Q26`, `Q27`, `Q28`, `Q29`, `Q30`, `Q31`, `Q32`, `Q33`, `Q34`, `Q35`, `Q36`, `Q37`, `Q38A`, `Q38B`, `Q38C`, `Q39`, `Q40A`, `Q40B`, `Q40C`, `Q41`, `Q42A`, `Q42B`, `Q43`, `Q44`, `Q45`, `Q46`, `Q47`, `Q48`, `Q49`, `Q50A`, `Q50B`, `Q51`, `Q52`, `Q53`, `Q54`, `Q55`, `Q56`, `Q57`, `Q58`) VALUES
(5, 24, 1, 'Ballola, Billy Joel P', '1', '1', '21', '2023-12-27T08:46:41.726Z', 'Sample', '1', '3', 'Sample', 'Tatalog', '5', '99', '4', 'Sample', '290', '5', '5', 'Sample', '99', '4', 'Sample', 'Sample', '4', '5', '5', '5', '5', '4', '5', '1', '99', 'Sample', 'Sample', 'Sample', '5', '2', '2023-12-03T08:49:17.883Z', '4', '5', '6', '2', '4', '4', '2', 'Sample', '2', '2', 'Sample', '5', '3', '3', '4', '3', '4', '3', '2', '3', '4', '3', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A'),
(6, 24, 2, 'Navalta, Chardy Marie Angel ', '2', '2', '22', '2023-12-27T08:46:42.838Z', 'Sample', '1', '5', 'Sample', 'Tagalog', '5', '99', '3', 'Sample', '2999', '5', '5', 'Sample', '4', '4', 'Sample', 'Sample', '5', '5', '4', '4', '6', '5', '5', '2', '1', 'Sample', 'Sample', 'Aample', '7', '1', '2023-12-27T08:49:19.312Z', '4', '4', '5', '2', '5', '5', '4', 'Sample', '2', '2', 'Sample', '5', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 25, 1, 'Adelan, Rey, Frondozo', '1', '1', '47', '1976-07-22T05:31:00.000Z', 'Daet, Bicol', '1', '2', 'Catholic', 'Tagalog', '4', '3', '99', 'N/A', '6,000', '1', '3', 'Pampangga', '1', '1', 'Pfizer', 'N/A', '99', '99', '99', '6', '1', '6', '99 ', '99', '99', 'Salasad', 'Salasad, Magdalena', 'Salasad, Magdalena', '25', '1', '2003-03-02T06:00:00.000Z', '9', '9', '9', '2', '4', '5', '5', 'Lifetime', '1', '1', 'N/A', '6', '4', '4', '2', '3', '4', '6', '1', '3', '1', '8', 'N/A', 'N/A', 'N/A', 'Funds', 'Salasad, Magdalena'),
(8, 25, 2, 'Adelan, Princess, Alay', '2', '2', '41', '1982-12-27T05:32:00.000Z', 'Magdalena, Laguna', '1', '2', 'Catholic', 'Tagalog', '4', '3', '99', 'N/A', 'N/A', '99', '99', 'N/A', '4', '4', 'Pfizer', '2', '10', '2', '10', '6', '1', '6', '99 ', '99', '99', 'Salasad', 'Salasad, Magdalena', 'Salasad, Magdalena', '41', '1', '1986-12-02T06:00:00.000Z', '8', '9', '9', '2', NULL, '5', '5', 'Lifetime', '1', '1', 'N/A', '18', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 25, 3, 'Adelan, Reyvine, Alay', '3', '1', '22', '2001-12-12T05:33:00.000Z', 'Magdalena, Laguna', '1', '1', 'Catholic', 'Tagalog', '11', '1', '5', 'Bagong bayan Sta Cruz', 'N/A', '99', '99', 'N/A', '4', '4', 'Pfizer', 'N/A', '99', '99', '99', '1', '3', '6', '99 ', '99', '99', 'Salasad', 'Salasad, Magdalena', 'Salasad, Magdalena', '22', '1', '2001-12-12T06:01:00.000Z', '8', '8', '8', '2', NULL, '5', '5', 'Lifetime', '2', '2', 'N/A', '12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 25, 4, 'Adelan, Kim Nicole, Alay', '4', '2', '16', '2007-05-06T05:33:00.000Z', 'Magdalena, Laguna', '1', '1', 'Catholic', 'Tagalog', '8', '2', '3', 'Sta Cruz ', 'N/A', '99', '99', 'N/A', '4', '4', 'Pfizer', 'N/A', '99', '99', '99', '1', '3', '6', '99 ', '99', '99', 'Salasad', 'Salasad, Magdalena', 'Salasad, Magdalena', '16', '1', '2007-05-06T06:01:00.000Z', '8', '8', '8', '2', NULL, '5', '5', 'Lifetime', '2', '2', 'N/A', '10', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 26, 1, 'Ballola, Joel, A.', '1', '1', '46', '1978-02-10T11:33:38.494Z', 'Samar, Leyte', '1', '2', 'Catholic', 'Bisaya, Tagalog', '13', '99', '99', 'N/A', '30000', '1', '99', 'OFW', '1', '1', 'Pfizer', 'N/A', '99', '99', '99', '6', 'N/A', 'N/A', '99 ', '99', '2', 'Ibabang butnong', 'Ibabang butnong, Magdalena', 'Ibabanng butnong, Magdalena', '25', '1', '2000-01-05T11:50:23.278Z', '8', '15', '15', '2', '1', '1', '1', 'Forever', '2', '99', 'N/A', '7', '4', '4', '4', '3', '10', '6', '1', '1', '4', '6', 'N/A', 'N/A', 'Old Age', 'Cleaning Programs', 'Ibabang butnong, Magdalena'),
(12, 26, 2, 'Ballola, Gina, P.', '2', '2', '48', '1976-11-15T11:38:20.124Z', 'Quizon Province', '1', '2', 'Catholic', 'Tagalog', '3', '99', '99', 'N/A', 'N/A', '99', '99', 'N/A', '1', '1', 'Pfizer', '1, 1', '99', '99', '99', '6', 'N/A', 'N/A', '99 ', '99', '2', 'Ibabang butnong', 'Ibabang butnong, Magdalena', 'ibabang butnong, Magdalena', '25', '1', '2000-01-05T11:50:35.628Z', '8', '15', '15', '2', '1', '2', '3', 'Forever', '2', '99', 'N/A', '16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 26, 3, 'Ballola, Billy Joel, P.', '3', '1', '21', '2002-06-01T11:38:54.894Z', 'Magdalena, Laguna', '1', '1', 'Charolic', 'Tagalog', '11', '1', '5', 'Bagumbayan, Stacruz', 'N/A', '99', '99', 'N/A', '4', '4', 'Pfizer', 'N/A', '99', '99', '99', 'N/A', 'N/A', 'N/A', '99 ', '99', '2', 'Ibabang butnong', 'Ibabang butnong, Magdalena', 'Ibabang butnong, Magdalena', '21', '1', '2000-01-05T11:50:42.678Z', 'N/A', '15', '15', '2', '1', '5', '2', 'Forever', '2', '99', 'N/A', '99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 27, 1, 'Remolar, Klen Ghel, C', '2', '2', '25', '2000-09-21T23:09:00.000Z', 'Magdalena,Laguna ', '1', '1', 'Catholic', 'Tagalog', '12', '99', '99', 'None', '25,000', '1', '3', 'Makati', '1', '2', 'pfizer', 'none', '7', '3', '7', '1', '2', '6', '99 ', '99', '2', 'Salasad', 'manila', 'manila', '6', '2', '2023-08-07T23:15:00.000Z', '1', '15', 'hshsjs', '2', '2', '5', '4', 'to death', '1', '1', 'IT', '16', '1', '2', '2', '2', '5', '4', '1', '3', '6', '4', 'i’m ', 'none', 'none', 'none', 'none'),
(20, 30, 1, 'Buag, Judylyn C.', '1', '2', '', NULL, '', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 30, 2, 'Buag, Juliusmir C.', '3', '1', '22', '2001-10-18T23:54:30.360Z', 'Magdalena, Laguna ', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 31, 1, 'Tan, Jerone, T', '5', '1', '23', '2024-01-08T00:14:14.881Z', 'Magdalena, Laguna', '1', '1', 'Catholic', 'sample', '10', '2', '5', 'Manila', '30,000', '2', '1', 'Manila', '2', '1', 'Pfizer', 'none', '99', '99', '99', '6', '2', '3', '5', '99', '99', 'Salasad', 'sample', 'sample', 'sample', '99', '2024-01-08T00:17:45.282Z', '7', '4', '6', '1', '4', '2', '4', 'death', '1', '99', 'sample', '5', '3', '2', '3', '3', '5', '5', '2', '4', '4', '4', 'sample', 'none', 'none', 'none', 'none'),
(23, 32, 1, 'Deyro, Raquel C.', '12', '2', '34', '1979-01-08T00:16:15.289Z', 'Laguna Provincial Hostpital', '1', '2', 'Catholic', 'Tagalog', '11', '1', '5', 'Magdalena', 'N/A', '99', '99', 'N/A', '1', '3', 'Pfizer', 'N/A', '99', '99', '99', '1', '1', '6', '99 ', '2', '99', 'Salasad', 'Magdalena ', 'Sample', '20years', '99', '2024-01-08T00:32:35.247Z', '15', '15', '15', '2', '1', '4', '1', NULL, '1', '1', NULL, NULL, '4', '4', '0', '4', '9', '6', '1', '1', '2', '4', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample'),
(24, 32, 2, 'Deyro, Sebastian S.', '3', '1', '23', '1999-04-04T00:17:21.169Z', 'Laguna Provincial Hostpital', '1', '7', 'Catholic', 'Tagalog', '7', '1', '2', 'Sta. Cruz', '8500', '1', '3', 'Magdalena', '1', '1', 'Pfizer', 'N/A', '99', '99', '99', '1', '2', '6', '99 ', '2', '99', 'Salasad', 'Magdalena', 'Sample', '20years', '99', '2024-01-08T00:32:49.417Z', '15', '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 32, 3, 'Deyro, Emmanuel A.', '11', '1', '36', '1969-06-23T00:17:40.675Z', 'Laguna Provincial Hostpital', '1', '2', 'Catholic', 'Tagalog', '12', '1', '5', 'Magdalena', 'N/A', '99', '99', 'N/A', '1', '1', 'Pfizer', 'N/A', '99', '99', '99', '6', '2', '6', '99 ', '99', '99', 'Salasad', 'Magdalena', 'Sample', '20years', '99', '2024-01-08T00:32:56.515Z', '15', '15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(26, 33, 1, 'Novelozo, Kerby D.', '12', '2', '38', '1972-01-08T00:41:45.282Z', 'Magdalena', '1', '2', 'Catholic', 'Tagalog', '5', '1', '2', 'Magdalena', '10000', '2', '1', 'Magdalena', '1', '2', 'Pfizer', '1', '99', '99', '99', '6', '1', '5', '99 ', '99', '2', 'Salasad', 'Magdalena', 'N/A', '30years', '1', '2024-01-08T00:48:56.705Z', NULL, NULL, NULL, '2', '4', '1', '4', 'N/A', '99', '99', NULL, NULL, '4', '4', '3', '3', '4', '6', '1', '0', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, 33, 2, 'Novelozo, Maricar A.', '3', '1', '21', '2002-01-08T00:41:55.874Z', 'Magdalena', '1', '7', 'Catholic', 'Tagalog', '11', '1', '5', 'Sta. Cruz', 'N/A', '99', '99', 'N/A', '1', '3', 'Pfizer', NULL, NULL, '99', '99', '2', '1', '1', '99 ', NULL, '2', 'Salasad', 'Magdalena', 'N/A', '21years', '1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N/A', '99', '99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(28, 33, 3, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tagalog', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 34, 1, 'Salgado, Virgie', '1', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 35, 1, 'Acierto, Joseph E.', '1', '1', NULL, '2024-01-08T01:26:33.934Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `response_code` varchar(5) NOT NULL,
  `response_text` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `response`
--

INSERT INTO `response` (`id`, `question_id`, `response_code`, `response_text`) VALUES
(32, 3, '1', 'Male'),
(33, 3, '2', 'Female'),
(61, 2, '1', 'Head'),
(62, 2, '2', 'Spouse'),
(63, 2, '3', 'Son'),
(64, 2, '4', 'Daughter'),
(65, 2, '5', 'Stepson'),
(66, 2, '6', 'Stepdaughter'),
(67, 2, '7', 'Son-in-law'),
(68, 2, '9', 'Grandson'),
(69, 2, '10', 'Granddaughter'),
(70, 2, '11', 'Father'),
(71, 2, '12', 'Mother'),
(72, 2, '13', 'Brother'),
(73, 2, '14', 'Sister'),
(74, 2, '15', 'Uncle'),
(75, 2, '16', 'Aunt'),
(76, 2, '17', 'Nephew'),
(77, 2, '18', 'Niece'),
(78, 2, '19', 'Other Relative'),
(79, 2, '20', 'Non-relative'),
(80, 2, '21', 'Boarder'),
(81, 2, '22', 'Domestic helper'),
(82, 7, '1', 'Filipino'),
(83, 7, '2', 'Non-Filipino'),
(89, 8, '1', 'Single'),
(90, 8, '2', 'Married'),
(91, 8, '3', 'Living-in'),
(92, 8, '4', 'Widowed'),
(93, 8, '5', 'Separated'),
(94, 8, '6', 'Divorced'),
(95, 8, '7', 'Unknown'),
(138, 42, '1', 'Availability of jobs '),
(139, 42, '2', 'Higher wage'),
(140, 42, '3', 'Presence of schools or universities'),
(141, 42, '4', 'Presence of relatives and friends in other place'),
(142, 42, '5', 'Housing'),
(143, 43, '1', 'Availability of jobs'),
(144, 43, '2', 'Higher wage '),
(145, 43, '3', 'Presence of schools or universities'),
(146, 43, '4', 'Presence of relatives and friends in other place'),
(147, 43, '5', 'Housing'),
(148, 44, '1', 'Availability of jobs'),
(149, 44, '2', 'Higher wage'),
(150, 44, '3', 'Presence of schools or universities'),
(151, 44, '4', 'Presence of relatives and friends in other place'),
(152, 44, '5', 'Housing'),
(173, 15, '99', 'N/A'),
(174, 16, '1', 'Employment'),
(175, 16, '2', 'Business'),
(176, 16, '3', 'Remittance'),
(177, 16, '4', 'Investments'),
(178, 16, '5', 'Others'),
(179, 16, '99', 'N/A'),
(180, 17, '1', 'Permanent Work'),
(181, 17, '2', 'Casual Work'),
(182, 17, '3', 'Contractual Work'),
(183, 17, '4', 'Individually Owned Business'),
(184, 17, '5', 'Shared/Partnership Business'),
(185, 17, '6', 'Corporate Business'),
(186, 17, '99', 'N/A'),
(187, 18, '99', 'N/A'),
(188, 19, '1', 'Public hospital'),
(189, 19, '2', 'Private hospital'),
(190, 19, '3', 'Lying-in clinic'),
(191, 19, '4', 'Home'),
(192, 19, '99', 'N/A'),
(198, 21, '99', 'N/A'),
(199, 46, '1', 'Yes'),
(200, 46, '2', 'No'),
(201, 46, '99', 'N/A'),
(203, 48, '99', 'N/A'),
(204, 49, '1', 'Refrigeration and Airconditioning'),
(205, 49, '2', 'Automotive/Heavy Equipment Servicing'),
(206, 49, '3', 'Metal Worker'),
(207, 49, '4', 'Building Wiring Installation'),
(208, 49, '5', 'Heavy Equipment Operation'),
(209, 49, '6', 'Plumbing'),
(210, 49, '7', 'Welding'),
(211, 49, '8', 'Carpentry'),
(212, 49, '9', 'Baking'),
(213, 49, '10', 'Dressmaking'),
(214, 49, '11', 'Linguist'),
(215, 49, '12', 'Computer Graphics'),
(216, 49, '13', 'Painting'),
(217, 49, '14', 'Beauty Care'),
(218, 49, '15', 'Commercial Cooking '),
(219, 49, '16', 'Housekeeping'),
(220, 49, '17', 'Massage Therapy'),
(221, 49, '18', 'Others'),
(222, 49, '99', ' Q44'),
(223, 37, '99', ' N/A'),
(224, 38, '1', 'Lack of employment'),
(225, 38, '2', 'Perception of better income in other place'),
(226, 38, '3', 'Schooling'),
(227, 38, '4', 'Presence of relatives and friends in other place'),
(228, 38, '5', 'Employment/Job Relocation'),
(229, 38, '6', 'Disaster-related Relocation'),
(230, 38, '7', 'Retirement'),
(231, 38, '8', 'To live with Parents'),
(232, 38, '9', 'To live with Children'),
(233, 38, '10', 'Marriage'),
(234, 38, '11', 'Annulment/Divorce/ Separation'),
(235, 38, '12', 'Commuting-related Reasons'),
(236, 38, '13', 'Health-related Reasons'),
(237, 38, '14', 'Peace and Security'),
(238, 38, '15', 'Others '),
(239, 39, '1', 'Lack of employment '),
(240, 39, '2', 'Perception of better income in other place'),
(241, 39, '3', 'Schooling'),
(242, 39, '4', 'Presence of relatives and friends in other place'),
(243, 39, '5', 'Employment/Job Relocation'),
(244, 39, '6', 'Disaster-related Relocation'),
(245, 39, '7', 'Retirement'),
(246, 39, '8', 'To live with Parents'),
(247, 39, '9', 'To live with Children'),
(248, 39, '10', 'Marriage'),
(249, 39, '11', 'Annulment/Divorce/ Separation'),
(250, 39, '12', 'Commuting-related Reasons'),
(251, 39, '13', 'Health-related Reasons'),
(252, 39, '14', 'Peace and Security'),
(253, 39, '15', 'Others'),
(254, 40, '1', 'Lack of employment'),
(255, 40, '2', 'Perception of better income in other place'),
(256, 40, '3', 'Schooling'),
(257, 40, '4', 'Presence of relatives and friends in other place'),
(258, 40, '5', 'Employment/Job Relocation'),
(259, 40, '6', 'Disaster-related Relocation'),
(260, 40, '7', 'Retirement'),
(261, 40, '8', 'To live with Parents'),
(262, 40, '9', 'To live with Children'),
(263, 40, '10', 'Marriage'),
(264, 40, '11', 'Annulment/Divorce/ Separation'),
(265, 40, '12', 'Commuting-related Reasons '),
(266, 40, '13', 'Health-related Reasons'),
(267, 40, '14', 'Peace and Security'),
(268, 40, '15', 'Others'),
(269, 41, '1', 'Yes'),
(270, 41, '2', 'No'),
(271, 22, '99', 'N/A'),
(275, 23, '99', 'N/A'),
(276, 23, '1', 'Female sterilization/Ligation'),
(277, 23, '2', 'Male sterilization/Vasectomy'),
(278, 23, '3', 'IUD'),
(279, 23, '4', 'Injectables'),
(280, 23, '5', 'Implants '),
(281, 23, '6', 'Pill'),
(282, 23, '7', 'Condom'),
(283, 23, '8', 'Modern natural FP'),
(284, 23, '9', 'Lactational Amenorrhea Method (LAM)'),
(285, 23, '10', 'Traditional'),
(297, 24, '99', 'N/A'),
(298, 24, '1', 'Government hospital'),
(299, 24, '2', 'RHU/Health center'),
(300, 24, '3', 'Brgy. Health Station'),
(301, 24, '4', 'Private hospital'),
(302, 24, '5', 'Pharmacy'),
(303, 25, '99', 'N/A'),
(304, 25, '1', 'Female sterilization/Ligation'),
(305, 25, '2', 'Male sterilization/Vasectomy'),
(306, 25, '3', 'IUD'),
(307, 25, '4', 'Injectables'),
(308, 25, '5', 'Implants'),
(309, 25, '6', 'Pill'),
(310, 25, '7', 'Condom'),
(311, 25, '8', 'Modern natural FP'),
(312, 25, '9', 'Lactational Amenorrhea Method (LAM)'),
(313, 25, '10', 'Traditional'),
(321, 26, '1', 'PhilHealth paying member'),
(322, 26, '2', 'PhilHealth dependent of paying member'),
(323, 26, '3', 'PhilHealth indigent member'),
(324, 26, '4', 'PhilHealth dependent of indigent member'),
(325, 26, '5', 'GSIS'),
(326, 26, '6', 'SSS'),
(327, 26, '7', 'Private/HMO'),
(328, 27, '1', 'Government hospital'),
(329, 27, '2', 'RHU/Health center'),
(330, 27, '3', 'Brgy. Health Station'),
(331, 27, '4', 'Private hospital'),
(332, 27, '5', 'Private clinic'),
(333, 27, '6', 'Pharmacy'),
(334, 27, '7', 'Hilot/Herbalist'),
(335, 28, '1', 'Sick/Injured'),
(336, 28, '2', 'Prenatal/Postnatal'),
(337, 28, '3', 'Gave birth'),
(338, 28, '4', 'Dental'),
(339, 28, '5', 'Medical check-up'),
(340, 28, '6', 'Medical requirement'),
(341, 28, '7', 'NHTS/CCT/4Ps requirement'),
(343, 30, '99', 'N/A'),
(344, 30, '1', 'Registered Solo parent'),
(345, 30, '2', 'Non-Solo Parent'),
(346, 30, '3', 'Unregistered Solo Parent'),
(348, 32, '99', 'N/A'),
(349, 33, '99', 'N/A'),
(350, 34, '99', 'N/A'),
(351, 35, '99', 'N/A'),
(353, 31, '99', 'N/A'),
(354, 31, '1', 'Yes'),
(355, 31, '2', 'No'),
(356, 36, '99', 'N/A'),
(357, 36, '1', 'Non-Migrant'),
(358, 36, '2', 'Migrant'),
(359, 36, '3', 'Transient'),
(360, 11, '0', 'No education'),
(361, 11, '1', 'Pre-school'),
(362, 11, '2', 'Elementary level'),
(363, 11, '3', 'Elementary level'),
(364, 11, '4', 'High school level'),
(365, 11, '5', 'High school graduate'),
(366, 11, '6', 'Junior HS'),
(367, 11, '7', 'Junior HS graduate'),
(368, 11, '8', 'Senior HS level'),
(369, 11, '9', 'Senior HS graduate'),
(370, 11, '10', 'Vocational/Tech'),
(371, 11, '11', 'College level'),
(372, 11, '12', 'College graduate'),
(373, 11, '13', 'Post-graduate'),
(374, 11, '99', 'N/A'),
(375, 12, '1', 'Yes, public'),
(376, 12, '2', 'Yes, private'),
(377, 12, '3', 'No'),
(378, 12, '99', 'N/A'),
(379, 13, '0', 'Pre-school'),
(380, 13, '1', 'Elementary'),
(381, 13, '2', 'Junior High School'),
(382, 13, '3', 'Senior High School'),
(383, 13, '4', 'Vocational/Technical'),
(384, 13, '5', 'College/University'),
(385, 13, '99', 'N/A'),
(386, 14, '99', 'N/A'),
(437, 29, '1', 'Psychosocial Disability'),
(438, 29, '2', 'Chronic Illness'),
(439, 29, '3', 'Learning Disability'),
(440, 29, '4', 'Mental Disability'),
(441, 29, '5', 'Visual Disability'),
(442, 29, '6', 'Orthopedic Disability'),
(443, 29, '7', 'Hearing Disability'),
(444, 29, '8', 'Speech Disability'),
(445, 29, '9', 'Multiple Disability'),
(446, 29, '99 ', 'N/A'),
(447, 47, '1', 'Yes'),
(448, 47, '2', 'No'),
(449, 47, '99', 'N/A'),
(450, 50, '1', 'Rent-free without consent of owner'),
(451, 50, '2', 'Rent-free with consent of owner'),
(452, 50, '3', 'Rented'),
(453, 50, '4', 'Owned/Being amortized'),
(454, 51, '1', 'Rent-free without consent of owner'),
(455, 51, '2', 'Rent-free with consent of owner'),
(456, 51, '3', 'Rented'),
(457, 51, '4', 'Owned/Being amortized'),
(458, 52, '0', 'None'),
(459, 52, '1', 'Oil (vegetable, anime, others)'),
(460, 52, '2', 'Liquefied petroleum gas (GAS)'),
(461, 52, '3', 'Kerosene (Gaas)'),
(462, 52, '4', 'Electricity'),
(463, 53, '0', 'None'),
(464, 53, '1', 'Wood'),
(465, 53, '2', 'Charcoal'),
(466, 53, '3', 'Liquefied petroleum gas (GAS)'),
(467, 53, '4', 'Kerosene (Gaas)'),
(468, 53, '5', 'Electricity'),
(469, 9, '1', 'Lak, river, rain, other'),
(470, 9, '2', 'Dug well'),
(471, 9, '3', 'Unprotected spring'),
(472, 9, '4', 'Protected spring'),
(473, 9, '5', 'Peddler'),
(474, 9, '6', 'Tubed/Piped shallow well'),
(475, 9, '7', 'Shared, tubed/piped deep well'),
(476, 9, '8', 'Own use, tubed/piped deep well'),
(477, 9, '9', 'Shared, faucet community water system'),
(478, 9, '10', 'Own use, faucet community water system'),
(479, 9, '11', 'Bottled water'),
(486, 56, '1', 'Yes'),
(487, 56, '2', 'No'),
(488, 57, '0', 'None'),
(489, 57, '1', 'Open pit'),
(490, 57, '2', 'Close pit'),
(491, 57, '3', 'Water-sealed, other depository, shared'),
(492, 57, '4', 'Water-sealed, other depository, exclusive'),
(493, 57, '5', 'Water-sealed, sewer septic tank, shared'),
(494, 57, '6', 'Water-sealed, sewer septic tank, exclusive'),
(501, 59, '0', 'No walls'),
(502, 59, '1', 'Makeshift/salvaged/improvised materials'),
(503, 59, '2', 'Glass'),
(504, 59, '3', 'Asbestos'),
(505, 59, '4', 'Bamboo/Sawali/Cogon/Nipa'),
(506, 59, '5', 'Galvanized iron/aluminum'),
(507, 59, '6', 'Haft concrete/brick/stone and haft wood'),
(508, 59, '7', 'Wood'),
(509, 59, '8', 'Concrete/Brick/Stone'),
(510, 54, '1', 'Lake, river, rain, other'),
(511, 54, '2', 'Dug well'),
(512, 54, '3', 'Unprotected spring'),
(513, 54, '4', 'Protected spring'),
(514, 54, '5', 'Peddler'),
(515, 54, '6', 'Tubed/Piped shallow well'),
(516, 54, '7', 'Shared, tubed/piped deep well'),
(517, 54, '8', 'Own use, tubed/piped deep well'),
(518, 54, '9', 'Shared, faucet community water system'),
(519, 54, '10', 'Own use, faucet community water system'),
(520, 54, '11', 'Bottled water'),
(526, 58, '1', 'Single house'),
(527, 58, '2', 'Duplex'),
(528, 58, '3', 'Multi-unit residential (three units or more)'),
(529, 58, '4', 'Commercial/Industrial/Agricultural'),
(530, 58, '5', 'Institutional living quarter (hotel, hospital)'),
(531, 58, '6', 'Other housing unit (boat, cave, other)'),
(532, 20, '1', 'Doctor'),
(533, 20, '2', 'Nurse'),
(534, 20, '3', 'Midwife'),
(535, 20, '4', 'Hilot'),
(536, 20, '99', 'N/A'),
(544, 55, '1', 'Feeding to animals'),
(545, 55, '2', 'Burying'),
(546, 55, '3', 'Composting'),
(547, 55, '4', 'Burning'),
(548, 55, '5', 'Dumping individual pit (not burned)'),
(549, 55, '6', 'Picked-up by garbage truck');

-- --------------------------------------------------------

--
-- Table structure for table `survey_form`
--

CREATE TABLE `survey_form` (
  `id` int(11) NOT NULL,
  `first_visit_date` date DEFAULT NULL,
  `first_visit_time_start` time DEFAULT NULL,
  `first_visit_time_end` time DEFAULT NULL,
  `first_visit_result` text NOT NULL,
  `first_visit_date_next_visit` date NOT NULL,
  `first_visit_interviewer` varchar(100) NOT NULL,
  `first_visit_supervisor` varchar(100) NOT NULL,
  `second_visit_date` date DEFAULT NULL,
  `second_visit_time_start` time DEFAULT NULL,
  `second_visit_time_end` time DEFAULT NULL,
  `second_visit_result` varchar(20) NOT NULL,
  `second_visit_date_next_visit` date DEFAULT NULL,
  `second_visit_interviewer` varchar(100) NOT NULL,
  `second_visit_supervisor` varchar(100) NOT NULL,
  `date_encoded` date DEFAULT NULL,
  `encoder_name` varchar(100) NOT NULL,
  `supervisor_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `survey_form`
--

INSERT INTO `survey_form` (`id`, `first_visit_date`, `first_visit_time_start`, `first_visit_time_end`, `first_visit_result`, `first_visit_date_next_visit`, `first_visit_interviewer`, `first_visit_supervisor`, `second_visit_date`, `second_visit_time_start`, `second_visit_time_end`, `second_visit_result`, `second_visit_date_next_visit`, `second_visit_interviewer`, `second_visit_supervisor`, `date_encoded`, `encoder_name`, `supervisor_name`) VALUES
(25, '2023-12-22', '08:50:36', '08:50:37', 'C', '2023-12-22', 'Billy Joel', 'Julio', '0000-00-00', '00:00:00', '00:00:00', '', '0000-00-00', '', '', '2023-12-22', 'Chardy Marie', 'Secretary'),
(26, '2024-01-02', '06:00:00', '06:14:26', 'C', '2024-12-26', 'Sample', 'Sample', '0000-00-00', '00:00:00', '00:00:00', '', '0000-00-00', '', '', '2024-01-02', 'Chardy Marie', 'Secretary'),
(27, '2024-01-05', '11:30:57', '11:57:05', 'C', '2025-01-05', 'Sample', 'Sample', '0000-00-00', '00:00:00', '00:00:00', '', '0000-00-00', '', '', '2024-01-05', 'Chardy Marie', 'Secretary'),
(28, '2023-12-19', '23:10:00', '23:18:24', 'CB', '2024-11-18', 'Reyvine', 'Secretary', '2023-12-21', '00:09:35', '00:09:37', 'C', '2023-12-21', 'reyvine', 'Secretary', '2024-01-07', 'Rey', 'Secretary'),
(31, '2024-01-06', '23:56:02', '00:56:03', 'CB', '2024-01-07', 'julio', 'reyvine', '0000-00-00', '00:00:00', '00:00:00', '', '0000-00-00', '', '', '2024-01-07', 'Julio Suinan', 'Secretary'),
(32, '2024-01-07', '00:19:14', '00:19:16', 'CB', '2024-01-07', 'Reyvine', 'sample', '2024-01-08', '03:36:23', '16:36:25', 'C', '2025-01-08', 'Sample', 'Sample', '2024-01-08', 'Rey', 'Secretary'),
(33, '2024-01-08', '00:36:25', '00:36:27', 'CB', '2024-01-08', 'Reyvine', 'Sample', '0000-00-00', '00:00:00', '00:00:00', '', '0000-00-00', '', '', '2024-01-08', 'Rey', 'Secretary'),
(34, '2024-01-05', '00:51:20', '02:40:22', 'CB', '2024-01-10', 'Reyvine', 'Billy', '2024-01-08', '01:00:29', '01:00:32', 'C', '2024-01-08', 'Reyvie', 'sample', '2024-01-08', 'Rey', 'Secretary'),
(35, '2023-11-16', '00:25:06', '00:30:12', 'CB', '2022-12-09', 'Aivie Cabunyag', 'Norman', '0000-00-00', '00:00:00', '00:00:00', '', '0000-00-00', '', '', '2024-01-08', 'Julio Suinan', 'Secretary'),
(36, '2024-01-08', '01:26:53', '01:26:54', 'CB', '2024-01-19', 'Reyvine', 'Sample', '0000-00-00', '00:00:00', '00:00:00', '', '0000-00-00', '', '', '2024-01-08', 'Rey', 'Secretary');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `status` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `address_id`, `name`, `username`, `password`, `role`, `status`) VALUES
(26, 1, 'Billy Joel Ballola', 'admin', '$2b$10$6TfER2s84JaanG00KgtyDuSTVb7AOhndn1UkSZzLtsHKZHGpibmXO', 'administrator', 1),
(27, 11, 'Chardy Marie', 'healthworker', '$2b$10$5saBJ20MHI6.X6PblO8fse/QTnTMSOe2UQTRhnq93NgJoOH0/mqXu', 'health_worker', 1),
(28, 3, 'Chardy Marie', 'hw_sample', '$2b$10$5jQT0d2906WY3uw9xpEyE.no.7TkjaMl9u9tpU.5K5cFLNv9rumxe', 'health_worker', 1),
(29, 3, 'BillyJoel', 'secretary', '$2b$10$RcjFMVlCRlMar20n0euafOoI0nc2uR0xa.6oq7iZ9KZ3xqnjHt.ii', 'secretary', 2),
(31, 21, 'Reyvine Adelan', 'reyvine', '$2b$10$edlwuhfTzVHVoXSl0nmrkOsZPW4VotNsMRtjQS5sTCFi.j45Yu.Ha', 'secretary', 1),
(32, 13, 'Juliusmir Buag', 'juliusmir', '$2b$10$edlwuhfTzVHVoXSl0nmrkOvN2Ba.AK8JigN.iiCrStSH.HLENVpyy', 'secretary', 1),
(33, 21, 'Rey', 'rey123', '$2b$10$edlwuhfTzVHVoXSl0nmrkOCS6NrUqs91pZ.YOmHt5RWvyoynXc.rC', 'health_worker', 1),
(34, 13, 'Julio Suinan', 'julio123', '$2b$10$edlwuhfTzVHVoXSl0nmrkO9qiCt0V3lehEtfyj83iAMbvPpwLLHQG', 'health_worker', 1),
(35, 3, 'sample', 'sample', '$2b$10$edlwuhfTzVHVoXSl0nmrkOX.9lz2MOD1/Oxly7fscJk7YNIwhQ9m6', 'health_worker', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `household`
--
ALTER TABLE `household`
  ADD PRIMARY KEY (`id`),
  ADD KEY `survey_form` (`survey_form_id`),
  ADD KEY `address` (`address`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions_and_response`
--
ALTER TABLE `questions_and_response`
  ADD PRIMARY KEY (`id`),
  ADD KEY `household_id` (`household_id`);

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `survey_form`
--
ALTER TABLE `survey_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_pk` (`address_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `household`
--
ALTER TABLE `household`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `questions_and_response`
--
ALTER TABLE `questions_and_response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `response`
--
ALTER TABLE `response`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=550;

--
-- AUTO_INCREMENT for table `survey_form`
--
ALTER TABLE `survey_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `household`
--
ALTER TABLE `household`
  ADD CONSTRAINT `household_ibfk_1` FOREIGN KEY (`address`) REFERENCES `address` (`id`),
  ADD CONSTRAINT `survey_form` FOREIGN KEY (`survey_form_id`) REFERENCES `survey_form` (`id`);

--
-- Constraints for table `questions_and_response`
--
ALTER TABLE `questions_and_response`
  ADD CONSTRAINT `questions_and_response_ibfk_1` FOREIGN KEY (`household_id`) REFERENCES `household` (`id`);

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `response_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `address_pk` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
