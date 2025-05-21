import React from 'react';
import PricingCard from '../ui/card'

export const CARDSELECTION_TITEL1 = "Free plan"
export const CARDSELECTION_TITEL2 = "Pro plan"
export const CARDSELECTION_TITEL3 = "Innovator"
export const CARDSELECTION_TITEL4 = "Pro plan"

export const CARDSELECTION_RATE1 = "0€";
export const CARDSELECTION_RATE2 = "0€";
export const CARDSELECTION_RATE3 = "0€";
export const CARDSELECTION_RATE4 = "13€/month";

export const CARDSELECTION_BUTTON_TEXT1 = "Start now"
export const CARDSELECTION_BUTTON_TEXT2 = "Explore now"
export const CARDSELECTION_BUTTON_TEXT3 = "Contact HR team"
export const CARDSELECTION_BUTTON_TEXT4 = "Try for free"

export const CARDSELECTION_DESCRIPTION_TEXT1 = "Unlock full access to the platform and experience seamless efficiency with us."
export const CARDSELECTION_DESCRIPTION_TEXT2 = "Access AI tools for higher productivity, obtain collaboration opportunity, and optimize talent outsourcing."
export const CARDSELECTION_DESCRIPTION_TEXT3 = "Become a core contributor with exclusive access and enjoy Gaddr as a collaborator."
export const CARDSELECTION_DESCRIPTION_TEXT4 = "Designed for power users who need complete control over project management."

export const CARDSELECTION_BENEFIT1_TEXT1 = "Full access to current features and tools"
export const CARDSELECTION_BENEFIT1_TEXT2 = "Unlimited optimization for projects and tasks"
export const CARDSELECTION_BENEFIT1_TEXT3 = "Outsource top talents in field"
export const CARDSELECTION_BENEFIT1_TEXT4 = "Premium support from our team"

export const CARDSELECTION_BENEFIT2_TEXT1 = "Full access to all AI-powered features and tools"
export const CARDSELECTION_BENEFIT2_TEXT2 = "On-hand AI optimization and unlimited access to projects and tasks"
export const CARDSELECTION_BENEFIT2_TEXT3 = "Freelancer payments security and team data protection with blockchain-powered encryption"

export const CARDSELECTION_BENEFIT3_TEXT1 = "Collaborate with the development team on AI and blockchain-powered features"
export const CARDSELECTION_BENEFIT3_TEXT2 = "Free access for a limited time as a reward for your contribution"
export const CARDSELECTION_BENEFIT3_TEXT3 = "Includes all Explorer Plan features"

export const CARDSELECTION_BENEFIT4_TEXT1 = "Full access to all AI-driven features and tools"
export const CARDSELECTION_BENEFIT4_TEXT2 = "Unlimited projects and tasks with AI optimization "
export const CARDSELECTION_BENEFIT4_TEXT3 = "Premium suppor"

export const CARDSELECTION_UNIQUW_TEXT_PAYMENT = "Per user/month if billed annually (100€ billed monthly)" 
export const CARDSELECTION_NONUNIQUW_TEXT_PAYMENT = "Free for your whole team!"


const CardSection = () => {
  return (
    <div className="flex flex-col gap-4 lg:py-12 lg:gap-14 items-center">
      {/* Mobile horizontal scrolling container */}
      <div className="flex gap-3 lg:gap-7 w-full justify-center">
        {/* Inner container for horizontal scroll on mobile only */}
        <div className="flex space-x-4 lg:space-x-7">
          <PricingCard
            cardType={CARDSELECTION_TITEL1}
            rate={CARDSELECTION_RATE1}
            description={CARDSELECTION_DESCRIPTION_TEXT1}
            benefits={[
              CARDSELECTION_BENEFIT1_TEXT1,
              CARDSELECTION_BENEFIT1_TEXT2,
              CARDSELECTION_BENEFIT1_TEXT3,
              CARDSELECTION_BENEFIT1_TEXT4
            ]}
            link=""
            buttonDesc={CARDSELECTION_BUTTON_TEXT1}
            isFeatured={false}
            commingSoon={false}
            paylabel={CARDSELECTION_NONUNIQUW_TEXT_PAYMENT}
          />
          <PricingCard
            cardType={CARDSELECTION_TITEL2}
            rate={CARDSELECTION_RATE2}
            description={CARDSELECTION_DESCRIPTION_TEXT2}
            benefits={[
              CARDSELECTION_BENEFIT2_TEXT1,
              CARDSELECTION_BENEFIT2_TEXT2,
              CARDSELECTION_BENEFIT2_TEXT3,
            ]}
            link=""
            buttonDesc={CARDSELECTION_BUTTON_TEXT2}
            isFeatured={false}
            commingSoon={true}
            paylabel={CARDSELECTION_NONUNIQUW_TEXT_PAYMENT}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSection;

