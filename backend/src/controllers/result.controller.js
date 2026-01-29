import { supabase } from '../config/supabase.js';
import { success, failure } from '../utils/response.js';

export async function getResults(req, res) {
  const { caseId } = req.params;

  const { data: votes, error } = await supabase
    .from('votes')
    .select('*')
    .eq('case_id', caseId);

  if (error) return failure(res, error);

  const stats = {
    better: { A: 0, B: 0 },
    fairer: { A: 0, B: 0 }
  };

  votes.forEach(v => {
    stats.better[v.voted_better]++;
    stats.fairer[v.voted_fairer]++;
  });

  success(res, {
    totalVotes: votes.length,
    stats,
    comments: votes.map(v => v.comment).filter(Boolean)
  }, 'Results fetched');
}