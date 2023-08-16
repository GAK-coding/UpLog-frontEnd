import { useMutation } from '@tanstack/react-query';
import { imageUpload } from '@/api/Members/mypage.ts';

export function useImgUpload(data: File) {
  const formData = new FormData();
  formData.append('file', data);

  let url: string;
  const { mutate, isSuccess } = useMutation(() => imageUpload(formData), {
    onSuccess: (data) => {
      url = data;
    },
  });
  mutate();

  if (isSuccess) return url;
}
