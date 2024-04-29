import { Box, Text } from "@/components/core";
import { useTheme } from "styled-components";

export default function Sidebar() {
  const theme = useTheme();

  return (
    <Box
      width={279}
      background={theme.colors.background}
      borderRight={`1px solid ${theme.colors.border}`}
      height={"100vh"}
      pl={theme.spacing.s}
      pt={theme.spacing.s}
    >
      <Text fontSize={theme.size.l}>V-Task</Text>
    </Box>
  );
}
