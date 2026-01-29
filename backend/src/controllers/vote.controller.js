import { supabase } from '../config/supabase.js';
import { success, failure } from '../utils/response.js';
import { randomizeOptions } from '../utils/randomize.js';

// ===============================
// GET VOTE TASK (JUROR SIDE)
// ===============================
export async function getVoteTask(req, res) {
  try {
    const { data: cases, error } = await supabase
      .from('cases')
      .select('id, options(*)');

    if (error) return failure(res, error);

    if (!cases || cases.length === 0) {
      return failure(res, { message: 'No cases available' }, 404);
    }

    // Pick random case
    const randomCase =
      cases[Math.floor(Math.random() * cases.length)];

    const optionA = randomCase.options.find(
      o => o.option_label === 'A'
    );
    const optionB = randomCase.options.find(
      o => o.option_label === 'B'
    );

    if (!optionA || !optionB) {
      return failure(res, { message: 'Invalid case data' }, 500);
    }

    const randomized = randomizeOptions(optionA, optionB);

    return success(res, {
      case_id: randomCase.id,
      left: randomized.left.result_list,
      right: randomized.right.result_list,
      mapping: randomized.mapping
    });

  } catch (err) {
    return failure(res, err);
  }
}

// ===============================
// SUBMIT VOTE
// ===============================
export async function submitVote(req, res) {
  try {
    const { case_id, better, fairer, comment, mapping } = req.body;

    console.log("VOTE PAYLOAD:", {
      case_id,
      better,
      fairer,
      mapping,
      user_id: req.userId
    });

    const { data, error } = await supabase.from('votes').insert({
      case_id,
      user_id: req.userId,
      voted_better: mapping[better],
      voted_fairer: mapping[fairer],
      comment
    });

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return failure(res, error);
    }

    return success(res, data, 'Vote submitted');
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return failure(res, err);
  }
}

