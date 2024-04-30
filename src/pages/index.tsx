import Layout from "@/components/Layout";
import useHandleRoute from "@/hooks/useHandleRoute";
import Homepage from "./homepage";
import TaskManagement from "./task-management";

export default function Root() {
  const { isOpeningProject } = useHandleRoute();

  const RootComponent = isOpeningProject ? TaskManagement : Homepage;

  return (
    <Layout>
      <RootComponent />
    </Layout>
  );
}
