import React from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default function ReleaseNote() {
  return (
    <section className={'w-full py-32 px-56 '}>
      <div className={'border border-solid flex justify-between mb-4'}>
        <span className={'flex items-center'}>
          <img src="/images/test.jpeg" alt={'제품 사진'} className={'w-14 h-14 mr-4'} />
          <span className={'text-[2.6rem] font-bold'}>AllFormU</span>
        </span>
        <button className={'mr-2 text-gray-dark font-bold underline self-end'}>
          프로젝트 추가하기
        </button>
      </div>
      <div>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    </section>
  );
}
