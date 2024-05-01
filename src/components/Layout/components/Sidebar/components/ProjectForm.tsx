import { Box, FlexBox, StyledButton, Text, TextField } from "@/components/core";
import { UilCheck, UilPlus, UilTimes } from "@iconscout/react-unicons";
import { Controller, SubmitHandler } from "react-hook-form";

import { useTheme } from "styled-components";
import useHandleProjectForm, { Project } from "../hooks/useHandleProjectForm";
import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  withButton?: boolean;
  defaultValues: { project_name: string };
  isForceShowForm?: boolean;
  onCloseForm?: () => void;
  onSubmitForm?: () => void;
};

export default function ProjectForm({
  defaultValues,
  isForceShowForm,
  onCloseForm,
  onSubmitForm,
}: Readonly<Props>) {
  const [isShowFormProject, setIsShowFormProject] = useState(
    isForceShowForm ?? false
  );

  const theme = useTheme();
  const [scope, animate] = useAnimate();

  const { control, handleSubmitProject, trigger, validateSubmit } =
    useHandleProjectForm(defaultValues);

  const isEditting = !!defaultValues?.project_name;

  const ButtonIcon = isShowFormProject ? UilCheck : UilPlus;

  const handleClickButton = async () => {
    if (isShowFormProject) return;

    setIsShowFormProject(true);
    trigger("project_name");
  };

  const onValid: SubmitHandler<Project> = (value) => {
    onSubmitForm?.();
    handleSubmitProject(value);
    setIsShowFormProject(false);
  };

  useEffect(() => {
    if (isShowFormProject) {
      (async () => {
        await animate(scope.current, { opacity: 1 }, { duration: 0.3 });
      })();
    }
  }, [isShowFormProject]);

  return (
    <Box mt={theme.spacing.m} width={"100%"}>
      <form onSubmit={validateSubmit(onValid)}>
        {isShowFormProject && (
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
          </FlexBox>
        )}

        <FlexBox
          mt={theme.spacing.m}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <StyledButton
            gap={theme.spacing.m}
            type={isShowFormProject ? "submit" : "button"}
            onClick={handleClickButton}
          >
            <ButtonIcon size={theme.size.xm} />
            <Text fontSize={theme.size.m}>
              {isShowFormProject
                ? !!defaultValues?.project_name
                  ? "Confirm"
                  : "Add"
                : "New Project"}
            </Text>
          </StyledButton>
          {isShowFormProject && (
            <StyledButton
              gap={theme.spacing.m}
              type="button"
              onClick={() => {
                setIsShowFormProject(false);
                onCloseForm?.();
              }}
            >
              <UilTimes />
              <Text fontSize={theme.size.m}>Cancel</Text>
            </StyledButton>
          )}
        </FlexBox>
      </form>
    </Box>
  );
}
