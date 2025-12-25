import fs from 'fs';
import path from 'path';

export default function handler(req,res){
  const filePath = path.join(process.cwd(),'votes.json');
  let votes={};
  if(fs.existsSync(filePath)) votes=JSON.parse(fs.readFileSync(filePath));

  const top3={};
  for(const category in votes){
    const arr = Object.entries(votes[category])
      .map(([name,count])=>({name,votes:count}))
      .sort((a,b)=>b.votes-a.votes)
      .slice(0,3);
    top3[category]=arr;
  }
  res.status(200).json(top3);
}
