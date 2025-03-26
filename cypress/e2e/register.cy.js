describe('Register Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully submit form with valid data', () => {
    // Geçerli form verilerini gir
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('Test123!@#');
    cy.get('#terms').check();
    
    // Submit butonunun aktif olduğunu kontrol et
    cy.get('button[type="submit"]').should('not.be.disabled');
    
    // Formu gönder
    cy.get('form').submit();
    
    // Success sayfasına yönlendirildiğini kontrol et
    cy.url().should('include', '/success');
    cy.contains('Başarılı!').should('be.visible');
  });

  it('should show error messages and keep button disabled with invalid data', () => {
    // Email yanlış format
    cy.get('#email').type('invalid-email');
    cy.get('#password').type('Test123!@#');
    cy.get('#terms').check();
    
    // Email hata mesajını kontrol et
    cy.contains('Geçerli bir email adresi giriniz').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
    
    // Email ve password yanlış
    cy.get('#email').clear().type('test@example.com');
    cy.get('#password').clear().type('weak');
    
    // Her iki hata mesajını kontrol et
    cy.contains('Geçerli bir email adresi giriniz').should('not.exist');
    cy.contains('Şifre en az 8 karakter').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
    
    // Email ve password doğru ama şartlar kabul edilmedi
    cy.get('#password').clear().type('Test123!@#');
    cy.get('#terms').uncheck();
    
    // Şartlar hata mesajını kontrol et
    cy.contains('Şartları kabul etmelisiniz').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
  });
}); 