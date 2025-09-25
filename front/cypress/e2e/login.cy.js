describe('Login Flow', () => {
  it('logs in successfully and redirects to dashboard', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name="email"]').type('user@gmail.com');
    cy.get('input[name="password"]').type('password123');

    cy.contains('Sign In').click();

    // Wait for dashboard to load
    cy.url().should('include', '/dashboard/my-profile');
    cy.contains('My Profile ').should('exist'); // or any dashboard-specific text
  });
});
