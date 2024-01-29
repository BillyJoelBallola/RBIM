import { Router } from "express";
import { 
    getAllSurveyFormsData, 
    getTableEightReport, 
    getTableEighteenReport, 
    getTableElevenReport, 
    getTableFifteenReport, 
    getTableFiveReport, 
    getTableFortyOneReport, 
    getTableFortyReport, 
    getTableFortyTwoReport, 
    getTableFourReport, 
    getTableFourteenReport, 
    getTableNineReport, 
    getTableNineteenReport, 
    getTableOneReport, 
    getTableSevenReport, 
    getTableSeventeenReport, 
    getTableSixReport, 
    getTableSixteenReport, 
    getTableTenReport, 
    getTableThirteenReport, 
    getTableThirtyEightReport, 
    getTableThirtyFiveReport, 
    getTableThirtyFourReport, 
    getTableThirtyNineReport, 
    getTableThirtyOneReport, 
    getTableThirtyReport, 
    getTableThirtySevenReport, 
    getTableThirtySixReport, 
    getTableThirtyThreeReport, 
    getTableThirtyTwoReport, 
    getTableThreeReport, 
    getTableTwelveReport, 
    getTableTwentyEightReport, 
    getTableTwentyFiveReport, 
    getTableTwentyFourReport, 
    getTableTwentyNineReport, 
    getTableTwentyOneReport, 
    getTableTwentyReport, 
    getTableTwentySevenReport, 
    getTableTwentySixReport, 
    getTableTwentyThreeReport,  
    getTableTwentyTwoReport,  
    getTableTwoReport
} from "../controllers/ReportController.js";

const route = Router()

route.get("/survey_form_data", getAllSurveyFormsData);
route.get("/table_one/:address?/:dateFrom?/:dateTo?", getTableOneReport);
route.get("/table_two/:address?/:dateFrom?/:dateTo?", getTableTwoReport);
route.get("/table_three/:address?/:dateFrom?/:dateTo?", getTableThreeReport);
route.get("/table_four/:address?/:dateFrom?/:dateTo?", getTableFourReport);
route.get("/table_five/:address?/:dateFrom?/:dateTo?", getTableFiveReport);
route.get("/table_six/:address?/:dateFrom?/:dateTo?", getTableSixReport);
route.get("/table_seven/:address?/:dateFrom?/:dateTo?", getTableSevenReport);
route.get("/table_eight/:address?/:dateFrom?/:dateTo?", getTableEightReport);
route.get("/table_nine/:address?/:dateFrom?/:dateTo?", getTableNineReport);
route.get("/table_ten/:address?/:dateFrom?/:dateTo?", getTableTenReport);
route.get("/table_eleven/:address?/:dateFrom?/:dateTo?", getTableElevenReport);
route.get("/table_twelve/:address?/:dateFrom?/:dateTo?", getTableTwelveReport);
route.get("/table_thirteen/:address?/:dateFrom?/:dateTo?", getTableThirteenReport);
route.get("/table_fourteen/:address?/:dateFrom?/:dateTo?", getTableFourteenReport);
route.get("/table_fifteen/:address?/:dateFrom?/:dateTo?", getTableFifteenReport);
route.get("/table_sixteen/:address?/:dateFrom?/:dateTo?", getTableSixteenReport);
route.get("/table_seventeen/:address?/:dateFrom?/:dateTo?", getTableSeventeenReport);
route.get("/table_eighteen/:address?/:dateFrom?/:dateTo?", getTableEighteenReport);
route.get("/table_nineteen/:address?/:dateFrom?/:dateTo?", getTableNineteenReport);
route.get("/table_twenty/:address?/:dateFrom?/:dateTo?", getTableTwentyReport);
route.get("/table_twentyOne/:address?/:dateFrom?/:dateTo?", getTableTwentyOneReport);
route.get("/table_twentyTwo/:address?/:dateFrom?/:dateTo?", getTableTwentyTwoReport);
route.get("/table_twentyThree/:address?/:dateFrom?/:dateTo?", getTableTwentyThreeReport);
route.get("/table_twentyFour/:address?/:dateFrom?/:dateTo?", getTableTwentyFourReport);
route.get("/table_twentyFive/:address?/:dateFrom?/:dateTo?", getTableTwentyFiveReport);
route.get("/table_twentySix/:address?/:dateFrom?/:dateTo?", getTableTwentySixReport);
route.get("/table_twentySeven/:address?/:dateFrom?/:dateTo?", getTableTwentySevenReport);
route.get("/table_twentyEight/:address?/:dateFrom?/:dateTo?", getTableTwentyEightReport);
route.get("/table_twentyNine/:address?/:dateFrom?/:dateTo?", getTableTwentyNineReport);
route.get("/table_thirty/:address?/:dateFrom?/:dateTo?", getTableThirtyReport);
route.get("/table_thirtyOne/:address?/:dateFrom?/:dateTo?", getTableThirtyOneReport);
route.get("/table_thirtyTwo/:address?/:dateFrom?/:dateTo?", getTableThirtyTwoReport);
route.get("/table_thirtyThree/:address?/:dateFrom?/:dateTo?", getTableThirtyThreeReport);
route.get("/table_thirtyFour/:address?/:dateFrom?/:dateTo?", getTableThirtyFourReport);
route.get("/table_thirtyFive/:address?/:dateFrom?/:dateTo?", getTableThirtyFiveReport);
route.get("/table_thirtySix/:address?/:dateFrom?/:dateTo?", getTableThirtySixReport);
route.get("/table_thirtySeven/:address?/:dateFrom?/:dateTo?", getTableThirtySevenReport);
route.get("/table_thirtyEight/:address?/:dateFrom?/:dateTo?", getTableThirtyEightReport);
route.get("/table_thirtyNine/:address?/:dateFrom?/:dateTo?", getTableThirtyNineReport);
route.get("/table_forty/:address?/:dateFrom?/:dateTo?", getTableFortyReport);
route.get("/table_fortyOne/:address?/:dateFrom?/:dateTo?", getTableFortyOneReport);
route.get("/table_fortyTwo/:address?/:dateFrom?/:dateTo?", getTableFortyTwoReport);

export default route