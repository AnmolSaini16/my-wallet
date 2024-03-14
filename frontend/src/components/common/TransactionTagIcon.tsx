import { TransactionTagEnum } from "@/constants/enum/transaction.enum";
import {
  ShoppingCart,
  Utensils,
  ShoppingBag,
  CarFront,
  DollarSign,
  Home,
  MonitorSmartphone,
  PiggyBank,
  Coins,
  BusFront,
  Clapperboard,
} from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tag: TransactionTagEnum;
}

const size = 16;

const TransactionTagIcon = ({ tag, ...props }: Props) => {
  const getTransactionTagIcon = () => {
    let component = null;

    switch (tag) {
      case TransactionTagEnum.Supermarket:
        component = <ShoppingCart size={size} />;
        break;

      case TransactionTagEnum.FoodandDrinks:
        component = <Utensils size={size} />;
        break;

      case TransactionTagEnum.Shopping:
        component = <ShoppingBag size={size} />;
        break;

      case TransactionTagEnum.Vehicle:
        component = <CarFront size={size} />;
        break;

      case TransactionTagEnum.Income:
        component = <DollarSign size={size} />;
        break;

      case TransactionTagEnum.Housing:
        component = <Home size={size} />;
        break;

      case TransactionTagEnum.MobileandPC:
        component = <MonitorSmartphone size={size} />;
        break;

      case TransactionTagEnum.Investments:
        component = <PiggyBank size={size} />;
        break;

      case TransactionTagEnum.FinancialExpenses:
        component = <Coins size={size} />;
        break;

      case TransactionTagEnum.LifeAndEntertainment:
        component = <Clapperboard size={size} />;
        break;

      case TransactionTagEnum.Transportation:
        component = <BusFront size={size} />;
        break;
    }
    return component;
  };
  return (
    <>
      {getTransactionTagIcon() ? (
        <div {...props} className={props.className}>
          {getTransactionTagIcon()}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TransactionTagIcon;
