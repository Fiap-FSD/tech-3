import styled from 'styled-components';

interface SeparatorProps {
  text: string;
}

const SeparatorWrapper = styled.span`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Line = styled.span`
  height: 1px;
  flex-grow: 1;
  background-color: #d1d5db; // Cor correspondente ao bg-neutral-100 do Tailwind
`;

const Text = styled.span`
  flex-shrink: 0;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 1.25rem; // Corresponde ao text-2xl
  font-weight: 700; // Corresponde ao font-bold
  color: #d1d5db; // Cor correspondente ao text-neutral-100 do Tailwind
`;

export const Separator = ({ text }: SeparatorProps) => {
  return (
    <SeparatorWrapper>
      <Line />
      {text.length > 0 && <Text>{text}</Text>}
      <Line />
    </SeparatorWrapper>
  );
};