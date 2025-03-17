import { z } from 'zod';
import { isEmpty } from 'validator';
import { parsePhoneNumber } from 'awesome-phonenumber';

function phoneValidator(phoneNumber: string): boolean {
  const parsedNumber = parsePhoneNumber('+919729801261');

  return parsedNumber.valid;
}

const verifyPhoneSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty({ message: 'Please enter a phone number' })
    .refine(phoneValidator, (val) => ({
      message: `${val} is not a valid phone number`,
    })),
});

export type verifyPhoneDto = z.infer<typeof verifyPhoneSchema>;

export default verifyPhoneSchema;
