**OMEGA**

Team
 - Santiago Vargas Rugeles 
 - Jose Hugo Aguayo Mendoza
 - Andres Ramirez Ruiz
 - Arturo Pedraza Gonzalez 

# Core
   *"Keep the track of all your cards payments by optimizing it with the best financial option to do it."*
       
     By:
        - Access balances and current statements of every single one of 
          your credit/debit. 
        - Keep an analysis of different due pay dates of the credit cards,
          automate of suggest flow to do it depending on the analysis, and show all the proccess or reasoning
          behind the payment plan suggested and the result, saving some money and debt.
    
        
   Essential tools
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
        
   Programming Tools
        
      The programming tools that we used for this app were:
            - TypeScript
            - Plaid
            - React Native
            - SupaBase
            - Git
            
             
# Security / Encrypt

   In the security part, we split it by subtopics, depending on the type of functionality we want to protect.
   
    In the deep-level:
        Plaid handles all, such as the financial security, like encrypted connections with banks, authentication with financial institutions, and protection of user credentials. 
        
    In the app:
        We focuses on ensuring secure user interaction and decision-making at every step:
        
    Access and Authentication:
        - To enter the app, users must verify their identity using PIN, or password (Depending on the device, you can use Face ID.), this ensures that only authorized users can view or manage their connected financial accounts.  
        - No data is accessible until successful authentication.

    Personalized Recommendations:
        - For each credit or debit card, the app shows individual recommendations explaining: Why that specific card is the best option for the payment of the other card, with a brief reason,              such as lower interest rate, available balance, or upcoming due date.  
        - Each recommendation includes a “Learn more” section where users can view deeper details if they wish.

    Payment Actions:
        - Each recommendation has its own payment option, which users can decide per transaction, not all at once. This avoids confusion and prevents unwanted approvals.  
        - Before confirming any payment between cards, users are also asked to verify again with their PIN or password.

    Instruction Cleanup
        - After a transaction is confirmed and completed, all temporary authorizations or payment instructions are automatically deleted, this prevents duplicated payments, pending requests, or            accidental re-use of old authorizations.

   Together, this guarantees that every action from the login to the payment, is intentional, verified, and secure.


    

