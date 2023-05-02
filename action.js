import  express from "express";
import fetch from "node-fetch";
const router = express.Router();


router.get('/covidData', async (req, res) => {
    const data = await fetch(`https://api.covidtracking.com/v1/states/daily.json`, { method: 'get' });
    const arr = await data.json();
    let top_10_pos = [];
    let top_10_death = [];
    let addedStates = [];
  
    // Initialize top_10_pos and top_10_death arrays with objects containing state and count
    for (let i = 0; i < 10; i++) {
      top_10_pos.push({ state: "", positive: 0 });
      top_10_death.push({ state: "", death: 0 });
    }
  
    for (let i = 0; i < arr.length; i++) {
      const stateData = arr[i];
  
      // Check if state has already been added to top 10 and skip if it has
      if (addedStates.includes(stateData.state)) {
        continue;
      }
  
      // Compare state data with the highest values stored in top_10_pos and update if necessary
      for (let j = 0; j < top_10_pos.length; j++) {
        if (stateData.positive > top_10_pos[j].positive) {
          top_10_pos.splice(j, 0, { state: stateData.state, positive: stateData.positive });
          top_10_pos.pop();
          addedStates.push(stateData.state);
          break;
        }
      }
  
      // Compare state data with the highest values stored in top_10_death and update if necessary
      for (let j = 0; j < top_10_death.length; j++) {
        if (stateData.death > top_10_death[j].death) {
          top_10_death.splice(j, 0, { state: stateData.state, death: stateData.death });
          top_10_death.pop();
          break;
        }
      }
    }
  
    return res.status(200).json({
      answer: top_10_pos,
      answer2: top_10_death
    });
  });
  

export default router;