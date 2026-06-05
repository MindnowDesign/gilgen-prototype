import { ConfiguratorLayout } from "@/components/configurator/configurator-layout";
import { ConfiguratorWorkspace } from "@/components/configurator/configurator-workspace";

type ConfiguratorScreenProps = {
  doorName?: string;
  description?: string;
  backHref?: string;
};

export function ConfiguratorScreen({
  doorName,
  description,
  backHref,
}: ConfiguratorScreenProps) {
  return (
    <ConfiguratorLayout>
      <ConfiguratorWorkspace
        doorName={doorName}
        description={description}
        backHref={backHref}
      />
    </ConfiguratorLayout>
  );
}
