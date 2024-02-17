import { Spinner } from '@chakra-ui/react';
import { useIsFetching, useIsMutating } from 'react-query';

interface Props {
  isLoading?: boolean;
}
export default function Loading({ isLoading }: Props) {
  // useIsFetching은 현재 가져오고 있는 쿼리 호출의 정수 값을 리턴한다.
  const isFetching = useIsFetching(); // for now, just don't display
  // useIsFetching과 비슷하지만 변이 호출 중 현재 해결되지 않은 것이 있는지 알려준다.
  const isMutating = useIsMutating();
  // isFetching이 0보다 크면 로딩 스피너가 나타나게 한다.
  const display = isLoading ? 'inherit' : isFetching || isMutating ? 'inherit' : 'none';

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="olive.200"
      color="olive.800"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={display}
    />
  );
}
