import { Box, FlexBox, StyledButton, Text, TextField } from "@/components/core";
import { UilCheck, UilPlus, UilTimes } from "@iconscout/react-unicons";
import { Controller } from "react-hook-form";

import { useTheme } from "styled-components";
import useCreateProject from "../hooks/useCreateProject";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function CreateProjectForm() {
  const theme = useTheme();
  const [scope, animate] = useAnimate();

  const {
    control,
    handleSubmit,
    isAddingPage,
    onValid,
    setIsAddingPage,
    trigger,
  } = useCreateProject();

  const ButtonIcon = isAddingPage ? UilCheck : UilPlus;

  const handleClickButton = async () => {
    if (isAddingPage) return;

    setIsAddingPage(true);
    trigger("project_name");
  };

  useEffect(() => {
    if (isAddingPage) {
      (async () => {
        await animate(scope.current, { opacity: 1 }, { duration: 0.3 });
      })();
    }
  }, [isAddingPage]);

  return (
    <Box mt={theme.spacing.m}>
      <form onSubmit={handleSubmit(onValid)}>
        {isAddingPage && (
          <FlexBox
            opacity={0}
            ref={scope}
            alignItems={"center"}
            mb={theme.spacing.xm}
          >
            <Controller
              name="project_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField width={"100%"} {...field} />}
            />
            <StyledButton type="button" onClick={() => setIsAddingPage(false)}>
              <UilTimes />
            </StyledButton>
          </FlexBox>
        )}
        <StyledButton
          mt={theme.spacing.l}
          gap={theme.spacing.m}
          type={isAddingPage ? "submit" : "button"}
          onClick={handleClickButton}
        >
          <ButtonIcon size={theme.size.xm} />
          <Text fontSize={theme.size.m}>
            {isAddingPage ? "Add" : "New Project"}
          </Text>
        </StyledButton>
      </form>
    </Box>
  );
}
