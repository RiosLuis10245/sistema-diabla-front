import { FC, ReactNode } from 'react';

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export const StatsCard: FC<Props> = ({ title, value, icon, subtitle }) => {
  return (
    <div className="bg-white overflow-hidden rounded-lg shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
              {icon}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{value}</div>
                {subtitle && (
                  <div className="ml-2 text-sm text-gray-500">{subtitle}</div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};