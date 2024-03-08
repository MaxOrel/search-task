import * as yup from 'yup';

export const searchFormSchema = yup.object({
	search: yup.string().min(3).required(),
});
