import { supabase } from '../config/supabase.js';
import { success, failure } from '../utils/response.js';

export async function createCase(req, res) {
  try {
    const { audience_tag, resultsA, resultsB } = req.body;

    const { data: caseData, error } = await supabase
      .from('cases')
      .insert({
        audience_tag,
        created_by: req.userId   // 🔥 FIX
      })
      .select()
      .single();

    if (error) return failure(res, error);

    await supabase.from('options').insert([
      {
        case_id: caseData.id,
        option_label: 'A',
        result_list: resultsA
      },
      {
        case_id: caseData.id,
        option_label: 'B',
        result_list: resultsB
      }
    ]);

    return success(res, { case_id: caseData.id }, 'Case created');
  } catch (err) {
    return failure(res, err);
  }
}
