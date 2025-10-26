## OMEGA

Team
 - Santiago Vargas Rugeles 
 - Jose Hugo Aguayo Mendoza
 - Andres Ramirez Ruiz
 - Arturo Pedraza Gonzalez 

## Problem Statement

   *"Keep track of all your cards payments by optimizing them with the best financial option available."*

### Problem: 
   Many users have multiple credit and debit cards, each with different due dates, balances, and interest rates. Managing them becomes confusing and often leads to late payments, high interests, and loss of control. The lack of visibility across several banks makes it difficult to take smart financial decisions and avoid debt growth.

### Solution: 
  This app provides a clear and optimized way to manage all your cards in one place. It analyses your balances, interest rates, and due dates to suggest the best payment strategy possible, explaining why each recommendation is made. This helps users save money, stay organized, and make smarter financial moves without extra effort.

## Implementation Overview
   
     By:
        - Access balances and current statements of every single one of 
          your credit/debit. 
        - Keep an analysis of different due pay dates of the credit cards,
          automate of suggest a flow to do it depending on the analysis, and show all the process or reasoning
          behind the payment plan suggested and the result, saving some money and debt.
    
        
### Essential tools
   To make this possible, we use a specialized tool called Plaid, that is a secure financial connectivity provider allowing us to connect multiple banks and user cards to access up-to-date information about accounts, balances, credit limits, and payment dates, all without storing sensitive information. 
        
        What Plaid Does?
            - Securely connect to multiple banks without storing user credentials.  
            - Access real-time financial data, such as balances, transactions, and due dates.  
            - Authenticate payments and transfers authorized by the user through encrypted banking channels.  
            - Standardize integrations using Open Banking APIs, making it possible to interact with different financial institutions in a unified way.
            
        Why Plaid?
            - Analyze each user's financial status across multiple banks.  
            - Detect debts or upcoming payment deadlines.  
            - Guarantee compliance with financial regulations like PSD2 and Open Banking standards.
        
### Programming Tools
        
      The programming tools that we used for this app were:
            - TypeScript: Logic and app structure.
            - Plaid: Securely connecting to user financial data.
            - React Native: Building a cross-platform mobile app.
            - Supabase: Managing authentication, user sessions, and database storage.
            - Git: Version control and collaborative development.

### Dependencies

      The OMEGA application relies on parsing the TypeScript script "server.ts," which determines the process and the 
      best route for making payments. It's essentially the brain of OMEGA's security and the driving force behind the idea. 
      This file is available in the GitHub repository.
             
## Security / Encrypt

   In the security part, we split it by subtopics, depending on the type of functionality we want to protect.
   
    In the deep-level:
        Plaid handles all, such as the financial security, like encrypted connections with banks, authentication with financial institutions, and protection of user credentials. 
        
    In the app:
        We focus on ensuring secure user interaction and decision-making at every step:
        
    Access and Authentication:
        - To enter the app, users must verify their identity using PIN, or password (Depending on the device, you can use Face ID.), this ensures that only authorized users can view or manage their connected financial accounts.  
        - No data is accessible until successful authentication.

    Personalized Recommendations:
        - For each credit or debit card, the app shows individual recommendations explaining: Why that specific card is the best option for the payment of the other card, with a brief reason, such as lower interest rate, available balance, or upcoming due date.  
        - Each recommendation includes a “Learn more” section where users can view deeper details if they wish.

    Payment Actions:
        - Each recommendation has its own payment option, which users can decide per transaction, not all at once. This avoids confusion and prevents unwanted approvals.  
        - Before confirming any payment between cards, users are also asked to verify again with their PIN or password.

    Instruction Cleanup
        - After a transaction is confirmed and completed, all temporary authorizations or payment instructions are automatically deleted, this prevents duplicated payments, pending requests, or accidental re-use of old authorizations.

   Together, this guarantees that every action from the login to the payment, is intentional, verified, and secure.
   
## Potential Expansions:
        
         -Parental control for extension cards with the ability to monitor or block card usage.
         -Digital widgets to monitor different cards without having to log in to the app.
         -Filters to monitor purchases by category.
         -Geolocation of card usage.


## Expected Impact

  By providing payment recommendations and showing users exactly why they chose each option, the app helps reduce interest, avoid unnecessary fees, and improve overall financial literacy. It allows users to keep their payments organized, efficient, and transparent, with complete security and control.


    

