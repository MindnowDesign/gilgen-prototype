import { ConfiguratorLayout } from "@/components/configurator/configurator-layout";
import { ConfiguratorWorkspace } from "@/components/configurator/configurator-workspace";

type ConfiguratorScreenProps = {
  backHref?: string;
};

export function ConfiguratorScreen({ backHref }: ConfiguratorScreenProps) {
  return (
    <ConfiguratorLayout>
      <ConfiguratorWorkspace backHref={backHref} />
    </ConfiguratorLayout>
  );
}
