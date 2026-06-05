import { ConfiguratorLayout } from "@/components/configurator/configurator-layout";
import { ConfiguratorProductPanel } from "@/components/configurator/configurator-product-panel";
import { ConfiguratorSidebar } from "@/components/configurator/configurator-sidebar";

type ConfiguratorScreenProps = {
  doorName?: string;
  description?: string;
  backHref?: string;
};

export function ConfiguratorScreen({
  doorName = "Sliding Door System",
  description = "Placeholder",
  backHref,
}: ConfiguratorScreenProps) {
  return (
    <ConfiguratorLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:h-[calc(100dvh-5.5rem)] lg:flex-row lg:gap-6">
        <ConfiguratorProductPanel
          doorName={doorName}
          description={description}
          backHref={backHref}
        />
        <ConfiguratorSidebar />
      </div>
    </ConfiguratorLayout>
  );
}
