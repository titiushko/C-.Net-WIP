namespace WebBrowserLaboratory.Forms
{
    partial class MyWebBrowser
    {
        private System.Windows.Forms.Panel myPanel;
        private System.Windows.Forms.WebBrowser webBrowser;
        private System.Windows.Forms.Button navigateButton;
        private System.Windows.Forms.TextBox urlTextBox;
        private System.Windows.Forms.Button goButton;

        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code
        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.myPanel = new System.Windows.Forms.Panel();
            this.webBrowser = new System.Windows.Forms.WebBrowser();
            this.navigateButton = new System.Windows.Forms.Button();
            this.urlTextBox = new System.Windows.Forms.TextBox();
            this.goButton = new System.Windows.Forms.Button();
            this.myPanel.SuspendLayout();
            this.SuspendLayout();
            // 
            // myPanel
            // 
            this.myPanel.Controls.Add(this.webBrowser);
            this.myPanel.Location = new System.Drawing.Point(12, 12);
            this.myPanel.Name = "myPanel";
            this.myPanel.Size = new System.Drawing.Size(1236, 659);
            this.myPanel.TabIndex = 0;
            // 
            // webBrowser
            // 
            this.webBrowser.Dock = System.Windows.Forms.DockStyle.Fill;
            this.webBrowser.Location = new System.Drawing.Point(0, 0);
            this.webBrowser.MinimumSize = new System.Drawing.Size(20, 20);
            this.webBrowser.Name = "webBrowser";
            this.webBrowser.Size = new System.Drawing.Size(1236, 659);
            this.webBrowser.TabIndex = 0;
            this.webBrowser.ScriptErrorsSuppressed = true;
            // 
            // navigateButton
            // 
            this.navigateButton.Location = new System.Drawing.Point(496, 693);
            this.navigateButton.Name = "navigateButton";
            this.navigateButton.Size = new System.Drawing.Size(109, 23);
            this.navigateButton.TabIndex = 1;
            this.navigateButton.Text = "Navigate";
            this.navigateButton.UseVisualStyleBackColor = true;
            this.navigateButton.Click += new System.EventHandler(this.NavigateButton_Click);
            // 
            // urlTextBox
            // 
            this.urlTextBox.Location = new System.Drawing.Point(12, 693);
            this.urlTextBox.Name = "urlTextBox";
            this.urlTextBox.Size = new System.Drawing.Size(478, 22);
            this.urlTextBox.TabIndex = 2;
            // 
            // goButton
            // 
            this.goButton.Location = new System.Drawing.Point(612, 693);
            this.goButton.Name = "goButton";
            this.goButton.Size = new System.Drawing.Size(75, 23);
            this.goButton.TabIndex = 3;
            this.goButton.Text = "GO!!!";
            this.goButton.UseVisualStyleBackColor = true;
            this.goButton.Click += new System.EventHandler(this.GoButton_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1260, 728);
            this.Controls.Add(this.goButton);
            this.Controls.Add(this.urlTextBox);
            this.Controls.Add(this.navigateButton);
            this.Controls.Add(this.myPanel);
            this.Name = "WebBrowserLaboratory";
            this.Text = "Web Browser Laboratory";
            this.myPanel.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();
        }
        #endregion
    }
}