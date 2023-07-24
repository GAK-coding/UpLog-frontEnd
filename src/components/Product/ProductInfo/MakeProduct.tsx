import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MakeProduct({ isOpen, onClose }: Props) {
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        maxW="39.5rem"
        h={'46rem'}
        shadow={'boxShadow-sign-up'}
        rounded={'none'}
        p={'1.2rem'}
        bg={'var(--white)'}
      >
        <ModalHeader
          fontSize={'1.8rem'}
          fontWeight={700}
          bg={'var(--white)'}
          color={'var(--black)'}
        >
          제품 추가
        </ModalHeader>
        <ModalCloseButton
          fontSize={'1rem'}
          color={'var(--gray-light)'}
          mt={'0.6rem'}
          mr={'0.8rem'}
        />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}
